// 1. Googleスプレッドシートを開き、「拡張機能」>「Apps Script」をクリック
// 2. このコードをエディタに「すべて上書き」して保存
// 3. 「デプロイ」>「デプロイを管理」>「編集（鉛筆アイコン）」
//    - バージョン: 「新バージョン」を選択（これ重要！）
//    - 「デプロイ」ボタンを押す
// 4. URLは変わりませんが、ブラウザでそのURLを開くと管理画面が表示されます。

function doGet(e) {
    const params = e.parameter;
    const action = params.action;

    // フロントエンドからのポーリング用
    if (action === 'poll') {
        return handlePoll(params.userId);
    }

    // 管理画面を表示（アクセス時はパラメータなし、または page=admin）
    return HtmlService.createHtmlOutput(getAdminHtml())
        .setTitle('チャット管理画面')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function doPost(e) {
    let data;
    try {
        data = JSON.parse(e.postData.contents);
    } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid JSON' })).setMimeType(ContentService.MimeType.JSON);
    }

    const action = data.action;

    if (action === 'send') {
        return handleSend(data);
    }

    // 管理画面からの返信用
    if (action === 'admin_reply') {
        return handleAdminReply(data);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
}

// ユーザーからのメッセージ受信
function handleSend(data) {
    const sheet = getSheet();
    const timestamp = new Date();
    // 管理者からの返信として書き込む (Sender = 'bot')
    sheet.appendRow([timestamp, data.userId, data.sender, data.text, 'unread']);
    return ContentService.createTextOutput(JSON.stringify({ status: 'sent' })).setMimeType(ContentService.MimeType.JSON);
}

// ユーザー（フロントエンド）へのメッセージ配信
function handlePoll(userId) {
    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();
    // ヘッダー除外
    const dataRows = rows.slice(1);

    // このユーザー宛のメッセージ
    const messages = dataRows
        .filter(row => row[1] === userId)
        .map(row => ({
            id: row[0].getTime().toString(),
            timestamp: row[0],
            sender: row[2], // bot or user
            text: row[3]
        }));

    return ContentService.createTextOutput(JSON.stringify({ messages: messages })).setMimeType(ContentService.MimeType.JSON);
}

// 管理画面からの返信処理
function handleAdminReply(data) {
    const sheet = getSheet();
    const timestamp = new Date();
    // 管理者からの返信として書き込む (Sender = 'bot')
    sheet.appendRow([timestamp, data.targetUserId, 'bot', data.text, 'read']);
    return ContentService.createTextOutput(JSON.stringify({ status: 'sent' })).setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('chat_logs');
    if (!sheet) {
        sheet = ss.insertSheet('chat_logs');
        sheet.appendRow(['Timestamp', 'UserId', 'Sender', 'Text', 'ReadStatus']);
    }
    return sheet;
}

// 管理画面のHTML
function getAdminHtml() {
    return `
<!DOCTYPE html>
<html>
<head>
  <base target="_top">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <style>
    body { font-family: sans-serif; background: #f3f4f6; }
    .chat-bubble { max-width: 80%; padding: 0.5rem 1rem; border-radius: 1rem; margin-bottom: 0.5rem; word-break: break-all; }
    .user-msg { background: #fff; color: #1f2937; margin-right: auto; border-top-left-radius: 0; }
    .bot-msg { background: #3b82f6; color: #fff; margin-left: auto; border-top-right-radius: 0; }
  </style>
</head>
<body class="h-screen flex flex-col md:flex-row overflow-hidden">
  <!-- Sidebar -->
  <div class="w-full md:w-1/4 bg-white border-r border-gray-200 flex flex-col h-1/3 md:h-full">
    <div class="p-4 border-b border-gray-200 bg-slate-800 text-white font-bold flex justify-between items-center">
        <span>チャット一覧</span>
        <div class="flex gap-2">
            <button onclick="fetchData()" class="text-xs bg-slate-600 px-2 py-1 rounded hover:bg-slate-500">更新</button>
        </div>
    </div>
    <div id="user-list" class="flex-1 overflow-y-auto">
      <!-- User List will be here -->
    </div>
    <div id="status-bar" class="p-2 text-xs text-gray-400 border-t bg-gray-50">State: Init</div>
  </div>

  <!-- Main Chat Area -->
  <div class="flex-1 flex flex-col h-2/3 md:h-full relative">
    <div id="chat-header" class="p-4 bg-white border-b border-gray-200 font-bold text-gray-700 shadow-sm z-10">
      未選択
    </div>
    <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 pb-20">
      <p class="text-center text-gray-400 mt-10">左のリストからユーザーを選択してください</p>
    </div>
    
    <!-- Input Area -->
    <div class="p-4 bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0">
      <form onsubmit="sendReply(event)" class="flex gap-2">
        <input type="text" id="reply-input" placeholder="返信を入力..." class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">送信</button>
      </form>
    </div>
  </div>

  <script>
    let allMessages = [];
    let currentUserId = null;
    const POLLING_INTERVAL = 5000;
    const KEY_INIT_DONE = 'chat_init_done';
    const KEY_LAST_NOTIFIED_TS = 'chat_last_notified_ts';

    // 初期化
    window.onload = function() {
      fetchData();
      setInterval(fetchData, POLLING_INTERVAL);
    };

    function playNotificationSound() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.type = 'sine';
        
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch (e) {
        console.error('Audio play failed', e);
      }
    }

    function fetchData() {
      document.getElementById('status-bar').textContent = 'Loading...';
      google.script.run.withSuccessHandler(render).withFailureHandler((err) => {
        document.getElementById('status-bar').textContent = 'Error: ' + err.message;
        console.error(err);
      }).getAdminPollData();
    }

    function render(responseJson) {
      if (!responseJson) {
         document.getElementById('status-bar').textContent = 'Error: Empty response';
         return;
      }
      let data;
      try {
        data = JSON.parse(responseJson);
      } catch (e) {
        document.getElementById('status-bar').textContent = 'Error: JSON Parse';
        return;
      }
      
      if (!data.messages) {
        document.getElementById('status-bar').textContent = 'No messages field';
        return;
      }
      
      allMessages = data.messages;
      document.getElementById('status-bar').textContent = 'Loaded ' + allMessages.length + ' msgs';
      
      try {
        maybeNotify(allMessages);
      } catch (e) {
        console.error('Notify Error:', e);
      }
      
      try {
        updateUserList();
        if (currentUserId) {
          renderMessages(currentUserId);
        }
      } catch (e) {
        document.getElementById('status-bar').textContent = 'Render Error: ' + e.message;
      }
    }

    function updateUserList() {
      const users = {};
      allMessages.forEach(msg => {
        if (!users[msg.userId]) {
          users[msg.userId] = {
            lastMsg: msg.text,
            lastTime: new Date(msg.timestamp),
            unread: msg.sender === 'user' 
          };
        }
        // 時間更新
        if (new Date(msg.timestamp) > users[msg.userId].lastTime) {
          users[msg.userId].lastTime = new Date(msg.timestamp);
          users[msg.userId].lastMsg = msg.text;
        }
      });

      const listEl = document.getElementById('user-list');
      listEl.innerHTML = '';
      
      Object.keys(users).sort((a,b) => users[b].lastTime - users[a].lastTime).forEach(uid => {
        const u = users[uid];
        const div = document.createElement('div');
        div.className = \`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition \${currentUserId === uid ? 'bg-blue-50' : ''}\`;
        div.onclick = () => selectUser(uid);
        div.innerHTML = \`
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-gray-700 text-sm">\${uid.substr(0,8)}...</span>
            <span class="text-xs text-gray-400">\${formatTime(u.lastTime)}</span>
          </div>
          <div class="text-sm text-gray-500 truncate">\${u.lastMsg}</div>
        \`;
        listEl.appendChild(div);
      });
    }

    function selectUser(uid) {
        currentUserId = uid;
        document.getElementById('chat-header').textContent = \`User: \${uid}\`;
        renderMessages(uid);
        updateUserList(); // ハイライト更新
    }

    function renderMessages(uid) {
        const msgs = allMessages.filter(m => m.userId === uid).sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
        const chatEl = document.getElementById('chat-messages');
        chatEl.innerHTML = '';
        
        msgs.forEach(m => {
            const isUser = m.sender === 'user';
            const div = document.createElement('div');
            div.className = \`flex flex-col \${isUser ? 'items-start' : 'items-end'}\`;
            div.innerHTML = \`
                <div class="text-[10px] text-gray-400 mb-1 mx-1">\${isUser ? 'User' : 'You'} - \${formatTime(new Date(m.timestamp))}</div>
                <div class="chat-bubble \${isUser ? 'user-msg border border-gray-200' : 'bot-msg'}">
                    \${m.text}
                </div>
            \`;
            chatEl.appendChild(div);
        });
        chatEl.scrollTop = chatEl.scrollHeight;
    }

    function sendReply(e) {
        e.preventDefault();
        if (!currentUserId) return alert('ユーザーを選択してください');
        const input = document.getElementById('reply-input');
        const text = input.value;
        if (!text.trim()) return;

        const payload = {
            action: 'admin_reply',
            targetUserId: currentUserId,
            text: text
        };

        // UIを即時更新（楽観的更新）
        allMessages.push({
            userId: currentUserId,
            sender: 'bot',
            text: text,
            timestamp: new Date().toISOString()
        });
        renderMessages(currentUserId);
        input.value = '';

        // 送信
        const req = JSON.stringify(payload);
        google.script.run.withSuccessHandler(() => console.log('sent')).processAdminRaw(req);
    }

    function formatTime(d) {
        return d.getHours() + ':' + d.getMinutes().toString().padStart(2, '0');
    }

    function maybeNotify(messages) {
      // まだ一度もロードしていないなら通知しない
      var isInitialLoad = !localStorage.getItem(KEY_INIT_DONE);
      
      // 未読管理
      var userMsgs = messages.filter(function(m) { return m.sender.toLowerCase() !== 'me'; });
      if (userMsgs.length === 0) {
        if (!localStorage.getItem(KEY_INIT_DONE)) localStorage.setItem(KEY_INIT_DONE, 'true');
        return;
      }

      var lastMsg = userMsgs[userMsgs.length - 1];
      var lastNotifiedVal = localStorage.getItem(KEY_LAST_NOTIFIED_TS);
      var lastNotifiedTs = lastNotifiedVal ? parseInt(lastNotifiedVal, 10) : 0;

      // 新着判定
      var hasNewMessage = lastMsg.timestamp > lastNotifiedTs;

      if (!localStorage.getItem(KEY_INIT_DONE)) {
        localStorage.setItem(KEY_INIT_DONE, 'true');
        localStorage.setItem(KEY_LAST_NOTIFIED_TS, lastMsg.timestamp);
        return;
      }

      if (hasNewMessage) {
         // シンプルな音だけ鳴らす
         playNotificationSound();
         
         // 直近通知時刻を更新
         localStorage.setItem(KEY_LAST_NOTIFIED_TS, lastMsg.timestamp);
      }
    }
  </script>
</body>
</html>
  `;
}

// ブリッジ関数
function processAdminRaw(jsonString) {
    const e = { postData: { contents: jsonString } };
    return doPost(e).getContent();
}

function getAdminPollData() {
    // 既存のhandleAdminPollからデータを取得するための簡易ブリッジ（関数自体は残しておいて中身を直接実装でもよいが、既存流用で）
    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();
    const dataRows = rows.slice(1);
    const messages = dataRows.map(row => ({
        timestamp: row[0],
        userId: row[1],
        sender: row[2],
        text: row[3]
    }));
    return JSON.stringify({ messages: messages });
}
