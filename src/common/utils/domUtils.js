const DOC = document;
export const isDOM = (typeof HTMLElement === 'object') ?
  function isDOMByHTMLElement(obj) {
    return obj instanceof HTMLElement;
  } :
  function isDOMByNodeType(obj) {
    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };
export const nodeRect = (dom) => {
  if (!isDOM(dom)) return {};
  const rect = dom.getBoundingClientRect();
  if (rect.width === undefined) {
    rect.width = dom.offsetWidth;
    rect.height = dom.offsetHeight;
  }
  return rect;
};
export const scrollTop = (node) => {
  if (node && !isDOM(node)) return 0;
  if (!node) return DOC.documentElement.scrollTop || DOC.body.scrollTop || 0;
  return node.scrollTop || 0;
};
export const scrollLeft = (node) => {
  if (node && !isDOM(node)) return 0;
  if (!node) return DOC.documentElement.scrollLeft || DOC.body.scrollLeft || 0;
  return node.scrollLeft || 0;
};
export const positionTop = (node) => {
  if (!isDOM(node)) return 0;
  return nodeRect(node).top + scrollTop(node);
};
export const positionLeft = (node) => {
  if (!isDOM(node)) return 0;
  return nodeRect(node).left + scrollLeft(node);
};
export const classContains = (node, className) => {
  if (!isDOM(node) || !className) return false;
  if (node.classList) {
    return node.classList.contains(className);
  }
  const nodeClassName = node.getAttribute('class');
  // language=JSRegexp
  // eslint-disable-next-line
  const reg = new RegExp(`(^|\s+)${className}(\s+|$)`);
  return reg.test(nodeClassName);
};
export const equalNode = (node, tag) => {
  if (!isDOM(node) || !tag) return false;
  if (tag.indexOf('#') !== -1) {
    const id = tag.split('#')[1];
    return id === node.id;
  }
  if (tag.indexOf('.') !== -1) {
    const classname = tag.split('.')[1];
    return classContains(node, classname);
  }
  return false;
};

export const nodeParents = (node, tag) => {
  if (!isDOM(node)) return null;
  let currentNode = node.parentNode;
  while (currentNode !== document.body) {
    if (equalNode(currentNode, tag)) {
      break;
    }
    currentNode = currentNode.parentNode;
  }
  return currentNode;
};
export const contains = (root, n) => {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
};
