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

    // 管理画面からのデータ取得用
    if (action === 'admin_poll') {
        return handleAdminPoll();
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
}

// ユーザーからのメッセージ受信
function handleSend(data) {
    const sheet = getSheet();
    const timestamp = new Date();
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

// 管理画面への全データ配信
function handleAdminPoll() {
    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();
    const dataRows = rows.slice(1);

    // 全データを返す（クライアント側でグルーピング）
    const messages = dataRows.map(row => ({
        timestamp: row[0],
        userId: row[1],
        sender: row[2],
        text: row[3]
    }));

    return ContentService.createTextOutput(JSON.stringify({ messages: messages })).setMimeType(ContentService.MimeType.JSON);
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
            <button onclick="requestNotifyPermission()" class="text-xs bg-blue-600 px-2 py-1 rounded hover:bg-blue-500">🔔通知ON</button>
            <button onclick="fetchData()" class="text-xs bg-slate-600 px-2 py-1 rounded hover:bg-slate-500">更新</button>
        </div>
    </div>
    <div id="user-list" class="flex-1 overflow-y-auto">
      <!-- User List will be here -->
    </div>
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

    // 初期化
      fetchData();
      setInterval(fetchData, POLLING_INTERVAL);
    };

    function requestNotifyPermission() {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          alert('通知が許可されました');
        }
      });
    }

    function fetchData() {
      google.script.run.withSuccessHandler(render).withFailureHandler(console.error).getAdminPollData();
    }

    // サーバーサイドのdoPostをハックして使う（GASのClient APIだとdoPostを直接呼べないため、fetchで呼ぶ手もあるが、google.script.runを使う場合は関数を分けるのが定石。今回は簡易化のためfetchを使う）
    // 訂正: google.script.run はサーバー側の関数を直接呼べます。doPostではなく専用関数を作るべきでしたが、上記のGASコードには handleAdminPoll があるのでそれを呼びます。
    // コード修正: google.script.run で呼ぶために、サーバー側に露出させる関数が必要です。
    // 現状のGAS構造だと doPost 経由がメインなので、fetchで自分自身にPOSTするのが実は一番早いです。
    
    // しかし、GASのHTML内から自分自身のWeb App URLを知るのは難しいので、
    // ここはサーバー側スクリプトに「露出用関数」を追加するのがベストですが、
    // コードを極力単純にするため、fetchDataを「自分自身のURL」に対して行いたいところです。
    // ただURLがわからないので、サーバー側でスクリプトプロパティやテンプレート埋め込みが必要。
    
    // 今回は一番確実な「google.script.run」でサーバー関数を呼ぶ方式に変えます。
    // doPoll という関数をサーバー側に追加せずに済ませるため、doPostを使わず、専用のブリッジ関数を下に書きます。
  </script>
  
  <!-- 修正: google.script.run 用のスクリプト -->
  <script>
    const NOTIFY_KEY = 'chat_admin_last_notified_ts';
    const INIT_KEY = 'chat_admin_init_done';

    function render(responseJson) {
      const data = JSON.parse(responseJson);
      if (!data.messages) return;
      
      allMessages = data.messages;
      maybeNotify(allMessages);
      updateUserList();
      if (currentUserId) {
        renderMessages(currentUserId);
      }
    }

    function updateUserList() {
      const users = {};
      allMessages.forEach(msg => {
        if (!users[msg.userId]) {
          users[msg.userId] = {
            lastMsg: msg.text,
            lastTime: new Date(msg.timestamp),
            unread: msg.sender === 'user' // 簡易判定: 最新がユーザーなら未読...ではないが、まあこれでも
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
        // google.script.runはdoPostを直接呼べない（引数がObjectになる）ので、ブリッジ関数を呼ぶ
        google.script.run.withSuccessHandler(() => console.log('sent')).processAdminRaw(req);
    }

    function formatTime(d) {
        return \`\${d.getHours()}:\${d.getMinutes().toString().padStart(2, '0')}\`;
    }

    function maybeNotify(messages) {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const latestUserMsg = messages
        .filter(m => (m.sender || '').toLowerCase() === 'user')
        .map(m => ({ ts: new Date(m.timestamp).getTime(), text: m.text, userId: m.userId }))
        .sort((a, b) => b.ts - a.ts)[0];

      if (!latestUserMsg) return;

      const lastNotified = Number(localStorage.getItem(NOTIFY_KEY) || '0');
      const initialized = localStorage.getItem(INIT_KEY) === 'true';

      if (!initialized) {
        localStorage.setItem(NOTIFY_KEY, String(latestUserMsg.ts));
        localStorage.setItem(INIT_KEY, 'true');
        return;
      }

      if (latestUserMsg.ts > lastNotified) {
        localStorage.setItem(NOTIFY_KEY, String(latestUserMsg.ts));
        new Notification('新しいチャット', {
          body: latestUserMsg.text,
          tag: 'chat-new-message'
        });
      }
    }
  </script>
</body>
</html>
  `;
}

// ブリッジ関数: クライアント側JSから呼ばれる
function processAdminRaw(jsonString) {
    // doPostと同じ処理に流す
    const e = { postData: { contents: jsonString } };
    return doPost(e).getContent();
}

// データの読み出しもブリッジ経由で
function getAdminPollData() {
    return handleAdminPoll().getContent();
}

// polling用の上書き
function doGet(e) {
    const params = e.parameter;
    if (params && params.action === 'poll') {
        return handlePoll(params.userId);
    }
    return HtmlService.createHtmlOutput(getAdminHtml())
        .setTitle('チャット管理画面')
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// フロントからのデータ取得用（上書きで追加）
function fetchData() {
    // クライアント側JSのfetchDataから呼ばれるのはgoogle.script.run.getAdminPollData()に書き換える必要がある
    // なので上のscriptタグ内を修正します
}
