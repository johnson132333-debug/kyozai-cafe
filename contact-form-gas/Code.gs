/**
 * 教材 制作・修正 お問い合わせフォーム - GAS バックエンド
 *
 * デプロイ手順は README.txt を参照してください。
 */

// 届いたメールの宛先。変更する場合はここを書き換えてください。
var CONTACT_TO = 'kyozai.cafe@gmail.com';

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('教材 制作・修正 お問い合わせフォーム')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * フロント側から google.script.run 経由で呼ばれる。
 * data = { name: string, contact: string, text: string(生成された依頼文) }
 */
function sendContactEmail(data) {
  if (!data || !data.text) {
    throw new Error('本文が空です');
  }

  var name = (data.name || '名前未入力').toString().slice(0, 80);
  var contact = (data.contact || '連絡先未入力').toString().slice(0, 200);
  var text = data.text.toString().slice(0, 20000);

  var subject = '【教材カフェ】お問い合わせ: ' + name;
  var body = '送信者: ' + name + '\n連絡先: ' + contact + '\n\n' + text;

  var options = {};
  // 連絡先がメールアドレスの形をしていれば、返信先として使えるようにする
  if (contact.indexOf('@') !== -1 && contact.indexOf(' ') === -1) {
    options.replyTo = contact;
  }

  MailApp.sendEmail(CONTACT_TO, subject, body, options);

  return { ok: true };
}
