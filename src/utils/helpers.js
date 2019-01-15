/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
export const isMobile = {
  Android: function () {
    return (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.match(/Android/i)
    )
  },
  BlackBerry: function () {
    return (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.match(/BlackBerry/i)
    )
  },
  iOS: function () {
    return (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
    )
  },
  Opera: function () {
    return (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.match(/Opera Mini/i)
    )
  },
  Windows: function () {
    return (
      typeof window !== 'undefined' &&
      window.navigator.userAgent.match(/IEMobile/i)
    )
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    )
  }
}

export function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else if (typeof el.parentNode !== 'undefined') {
    el.parentNode.removeChild(el)
  }
}

/* 视口的大小，部分移动设备浏览器对innerWidth的兼容性不好，需要
 *document.documentElement.clientWidth或者document.body.clientWidth
 *来兼容（混杂模式下对document.documentElement.clientWidth不支持）。
 *使用方法 ： getViewPort().width;
 */
export function getViewPort () {
  // 浏览器嗅探，混杂模式
  if (document.compatMode === 'BackCompat') {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}

// 获得文档的大小（区别与视口）,与上面获取视口大小的方法如出一辙
export function getDocumentPort () {
  if (document.compatMode === 'BackCompat') {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: Math.max(document.documentElement.scrollWidth,
        document.documentElement.clientWidth),
      height: Math.max(document.documentElement.scrollHeight,
        document.documentElement.clientHeight)
    }
  }
}

export const use = (plugin) => {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }
}

export const registerComponent = (Vue, component) => {
  Vue.component(component.name, component)
}

export const registerComponentProgrammatic = (Vue, property, component) => {
  Vue.prototype[property] = component
}
