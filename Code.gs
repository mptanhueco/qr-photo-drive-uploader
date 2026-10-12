/** Deploy as Web App: Execute as Me; access Anyone. Public link: share carefully. */
const CONFIG = Object.freeze({
  FOLDER_ID: '1GTKI_gpITf146Uf1XEJ18Pm1rSiOvE7A',
  MAX_BYTES: 8 * 1024 * 1024,
  MAX_DAILY_UPLOADS: 200,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
});

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Share Your Photos')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// The only function the public page calls. Use a single-file HTML form as argument.
function uploadPhoto(form) {
  const blob = form.photo;
  if (!blob || typeof blob.getBytes !== 'function') throw new Error('No photo received.');
  const mime = String(blob.getContentType() || '').toLowerCase();
  const bytes = blob.getBytes();
  if (!CONFIG.ALLOWED_TYPES.includes(mime)) throw new Error('Unsupported image type. Please use JPEG, PNG, WebP or HEIC.');
  if (!bytes.length || bytes.length > CONFIG.MAX_BYTES) throw new Error('Photos must be between 1 byte and 8 MB.');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const props = PropertiesService.getScriptProperties();
    const day = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
    const key = 'uploads_' + day;
    const count = Number(props.getProperty(key) || 0);
    if (count >= CONFIG.MAX_DAILY_UPLOADS) throw new Error('This photo station has reached its daily upload limit.');
    const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
    const ext = ({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/heic':'heic','image/heif':'heif'})[mime];
    const name = 'guest_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss_SSS') + '_' + Utilities.getUuid().slice(0,8) + '.' + ext;
    const file = folder.createFile(blob.setName(name));
    props.setProperty(key, String(count + 1));
    return { ok: true, name: file.getName() };
  } finally {
    lock.releaseLock();
  }
}
