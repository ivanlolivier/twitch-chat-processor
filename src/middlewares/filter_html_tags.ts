export default function filterHTMLTags(message) {
  message.msg = message.msg.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  return message;
}
