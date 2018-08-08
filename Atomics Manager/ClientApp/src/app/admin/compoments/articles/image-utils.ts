export class ImageUtils {
  static toBlob(base64:string,filename:string):File
  {
    let contenType=base64.split(';')[0];
    base64=base64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi,'');
    let byteCharaters=atob(base64);
    let byteNumber=new Array(byteCharaters.length);
    for (let index = 0; index < byteCharaters.length; index++) {
      byteNumber[index]=byteCharaters.charCodeAt(index);

    }
    let byteArray=new Uint8Array(byteNumber);
    let blob=new Blob([byteArray],{type:contenType});
    var b:any =blob;
    b.lastModifiedDate=new Date();
    b.name=filename;
    return <File>b;
  }
}
