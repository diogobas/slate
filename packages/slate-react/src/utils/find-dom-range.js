import findDOMPoint from './find-dom-point'

/**
 * Find a native DOM range Slate `range`.
 *
 * @param {Range} range
 * @param {Window} win (optional)
 * @param {Element} container (optional)
 * @return {Object|Null}
 */

function findDOMRange(range, win = window, container = window.document) {
  const { anchor, focus, isBackward, isCollapsed } = range
  const domAnchor = findDOMPoint(anchor, win, container)
  const domFocus = isCollapsed ? domAnchor : findDOMPoint(focus, win, container)

  if (!domAnchor || !domFocus) return null

  const r = win.document.createRange()
  const start = isBackward ? domFocus : domAnchor
  const end = isBackward ? domAnchor : domFocus
  r.setStart(start.node, start.offset)
  r.setEnd(end.node, end.offset)
  return r
}

/**
 * Export.
 *
 * @type {Function}
 */

export default findDOMRange
