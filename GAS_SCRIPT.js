// 1. Googleスプレッドシートを開き、「拡張機能」>「Apps Script」をクリック
// 2. このコードをエディタに貼り付けて保存（ファイル名は「コード.gs」など）
// 3. 「デプロイ」>「新しいデプロイ」>「種類の選択：ウェブアプリ」
//    - 説明: 任意
//    - 次のユーザーとして実行: 自分
//    - アクセスできるユーザー: 全員（必ず「全員」を選択）
// 4. 「デプロイ」ボタンを押し、表示された「ウェブアプリのURL」をコピー
// 5. LPのソースコード（.env または ChatWidget.tsx）に設定

function doGet(e) {
    const params = e.parameter;
    const action = params.action;
    const userId = params.userId;

    if (action === 'poll') {
        return handlePoll(userId);
    }

    return ContentService.createTextOutput("OK");
}

function doPost(e) {
    // CORS対策: text/plainで送られてくるJSONをパース
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

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' })).setMimeType(ContentService.MimeType.JSON);
}

// メッセージ送信処理
function handleSend(data) {
    const sheet = getSheet();
    const timestamp = new Date();

    // シートに書き込む
    // A: Timestamp, B: UserId, C: Sender, D: Text, E: ReadStatus
    sheet.appendRow([timestamp, data.userId, data.sender, data.text, 'unread']);

    return ContentService.createTextOutput(JSON.stringify({ status: 'sent' }))
        .setMimeType(ContentService.MimeType.JSON);
}

// メッセージ取得処理（ポーリング）
function handlePoll(userId) {
    const sheet = getSheet();
    const rows = sheet.getDataRange().getValues();
    // ヘッダー行を除く
    const dataRows = rows.slice(1);

    // このユーザー宛のメッセージかつ、まだフロントで表示していないもの（bot発信のもの）
    const messages = dataRows
        .filter(row => row[1] === userId && row[2] === 'bot')
        .map(row => ({
            id: row[0].getTime().toString(), // Timestamp to ID
            timestamp: row[0],
            sender: 'bot',
            text: row[3]
        }));

    return ContentService.createTextOutput(JSON.stringify({ messages: messages }))
        .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('chat_logs');
    if (!sheet) {
        sheet = ss.insertSheet('chat_logs');
        sheet.appendRow(['Timestamp', 'UserId', 'Sender', 'Text', 'ReadStatus']); // Header
    }
    return sheet;
}

// 初回実行用（権限承認用）
function setup() {
    const sheet = getSheet();
    Logger.log('Setup complete');
}
