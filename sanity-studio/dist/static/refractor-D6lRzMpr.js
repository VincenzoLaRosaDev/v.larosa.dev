import {jsxs as c, Fragment as u, jsx as p} from 'react/jsx-runtime'
import {d, R as m} from './sanity-KL2zQOav.js'
import 'sanity'
import '@sanity/vision'
import 'react'
import 'sanity/router'
import 'styled-components'
import 'react-dom'
import 'sanity/structure'
function f(g) {
  const t = d.c(13),
    {language: s, value: e} = g,
    r = typeof s == 'string' ? s : void 0
  let n
  t[0] !== r ? ((n = r ? m.hasLanguage(r) : !1), (t[0] = r), (t[1] = n)) : (n = t[1])
  const a = n
  let o
  t[2] !== r || t[3] !== a || t[4] !== e
    ? ((o = !(r && a) && p('code', {children: e})), (t[2] = r), (t[3] = a), (t[4] = e), (t[5] = o))
    : (o = t[5])
  let i
  t[6] !== r || t[7] !== a || t[8] !== e
    ? ((i = r && a && p(m, {inline: !0, language: r, value: String(e)})),
      (t[6] = r),
      (t[7] = a),
      (t[8] = e),
      (t[9] = i))
    : (i = t[9])
  let l
  return (
    t[10] !== o || t[11] !== i
      ? ((l = c(u, {children: [o, i]})), (t[10] = o), (t[11] = i), (t[12] = l))
      : (l = t[12]),
    l
  )
}
f.displayName = 'LazyRefractor'
export {f as default}
