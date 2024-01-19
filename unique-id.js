/**
 * @author https://gist.github.com/gordonbrander/2230317
 * 
 * Create a unique id everytime
 */
export const genUID = () => {
    return Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4);
}