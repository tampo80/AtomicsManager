export class ImageUtils {
  static toBlob(base64: string, filename: string): File {
    const contenType = base64.split(';')[0];
    base64 = base64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
    const byteCharaters = atob(base64);
    const byteNumber = new Array(byteCharaters.length);
    for (let index = 0; index < byteCharaters.length; index++) {
      byteNumber[index] = byteCharaters.charCodeAt(index);

    }
    const byteArray = new Uint8Array(byteNumber);
    const blob = new Blob([byteArray], {type: contenType});
    const b: any = blob;
    b.lastModifiedDate = new Date();
    b.name = filename;
    return <File>b;
  }
}
