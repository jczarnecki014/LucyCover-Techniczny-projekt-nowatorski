const DownloadFileInBrowser = (blob,fileName) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName );
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}

export default DownloadFileInBrowser;