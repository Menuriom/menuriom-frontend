export const print = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const pri = iframe.contentWindow;
    pri.document.open();
    pri.document.write(section.value.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
};
