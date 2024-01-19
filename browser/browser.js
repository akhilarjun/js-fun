const renderEvent = new Event('RENDER');
const loadEvent = new Event('LOAD');
const destroyEvent = new Event('DESTROY');
const magicEvent = new Event('MAGIC');

class BrowserElement extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = 'Browser Element';
        this.style.display = 'block';
        this.style.padding = '10px';
        this.dispatchEvent(loadEvent);
        this.destroy = () => {
            return new Promise((res, rej) => {
                try {
                    this.remove();
                    this.dispatchEvent(destroyEvent);
                    res();
                } catch (e) {
                    console.error(e);
                    rej(e);
                }
            });
        }
    }
    connectedCallback() {
        this.dispatchEvent(renderEvent);
    }
}
customElements.define('el-browser', BrowserElement);