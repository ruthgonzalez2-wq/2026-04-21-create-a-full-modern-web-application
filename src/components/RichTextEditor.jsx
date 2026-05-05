import { memo, useEffect, useId, useMemo, useRef } from 'react'
import Quill from 'quill'

const FontClass = Quill.import('formats/font')
FontClass.whitelist = ['arial', 'helvetica', 'times-new-roman', 'georgia', 'garamond', 'palatino', 'verdana', 'tahoma', 'trebuchet-ms', 'courier-new']
Quill.register(FontClass, true)

const SizeStyle = Quill.import('attributors/style/size')
SizeStyle.whitelist = ['12px', '16px', '20px', '28px', '36px']
Quill.register(SizeStyle, true)

const BlockEmbed = Quill.import('blots/block/embed')

class LocalVideoBlot extends BlockEmbed {
  static blotName = 'localVideo'
  static tagName = 'video'

  static create(value) {
    const node = super.create()
    node.setAttribute('controls', 'controls')
    node.setAttribute('src', value)
    node.setAttribute('style', 'max-width:100%; border-radius: 16px;')
    return node
  }

  static value(node) {
    return node.getAttribute('src')
  }
}

Quill.register(LocalVideoBlot)

function RichTextEditorComponent({ value = '', onChange, name }) {
  const editorId = useId()
  const toolbarId = useMemo(() => `toolbar-${editorId.replace(/:/g, '')}`, [editorId])
  const containerRef = useRef(null)
  const quillRef = useRef(null)
  const imageInputRef = useRef(null)
  const videoInputRef = useRef(null)
  const lastValueRef = useRef(value || '')
  const changeTimerRef = useRef(null)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!containerRef.current || quillRef.current) {
      return
    }

    const quill = new Quill(containerRef.current, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: `#${toolbarId}`,
          handlers: {
            localImage: () => imageInputRef.current?.click(),
            localVideo: () => videoInputRef.current?.click(),
          },
        },
      },
    })

    quillRef.current = quill
    quill.root.innerHTML = value || ''
    lastValueRef.current = value || ''

    quill.on('text-change', () => {
      const html = quill.root.innerHTML
      lastValueRef.current = html
      window.clearTimeout(changeTimerRef.current)
      changeTimerRef.current = window.setTimeout(() => {
        onChangeRef.current?.(html)
      }, 120)
    })

    return () => {
      window.clearTimeout(changeTimerRef.current)
    }
  }, [toolbarId, value])

  useEffect(() => {
    const quill = quillRef.current
    if (!quill) {
      return
    }

    if ((value || '') !== lastValueRef.current) {
      const selection = quill.getSelection()
      quill.root.innerHTML = value || ''
      lastValueRef.current = value || ''
      if (selection) {
        quill.setSelection(selection.index, selection.length)
      }
    }
  }, [value])

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function handleImageFile(event) {
    const file = event.target.files?.[0]
    if (!file || !quillRef.current) {
      return
    }

    const result = await readFile(file)
    const quill = quillRef.current
    const range = quill.getSelection(true)
    quill.insertEmbed(range?.index || 0, 'image', result)
    quill.setSelection((range?.index || 0) + 1, 0)
    event.target.value = ''
  }

  async function handleVideoFile(event) {
    const file = event.target.files?.[0]
    if (!file || !quillRef.current) {
      return
    }

    const result = await readFile(file)
    const quill = quillRef.current
    const range = quill.getSelection(true)
    quill.insertEmbed(range?.index || 0, 'localVideo', result)
    quill.setSelection((range?.index || 0) + 1, 0)
    event.target.value = ''
  }

  return (
    <div className="grid gap-2">
      <div id={toolbarId} className="rounded-[1.2rem] border border-white/70 bg-white/80 p-2 shadow-sm">
        <span className="ql-formats">
          <select className="ql-font" defaultValue="arial">
            <option value="arial">Arial</option>
            <option value="helvetica">Helvetica</option>
            <option value="times-new-roman">Times New Roman</option>
            <option value="georgia">Georgia</option>
            <option value="garamond">Garamond</option>
            <option value="palatino">Palatino</option>
            <option value="verdana">Verdana</option>
            <option value="tahoma">Tahoma</option>
            <option value="trebuchet-ms">Trebuchet MS</option>
            <option value="courier-new">Courier New</option>
          </select>
          <select className="ql-size" defaultValue="16px">
            <option value="12px">Pequena</option>
            <option value="16px">Normal</option>
            <option value="20px">Grande</option>
            <option value="28px">Muy grande</option>
            <option value="36px">Gigante</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
        </span>
        <span className="ql-formats">
          <select className="ql-color" />
        </span>
        <span className="ql-formats">
          <button className="ql-align" value="" />
          <button className="ql-align" value="center" />
          <button className="ql-align" value="right" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats">
          <button className="ql-localImage" type="button">Imagen</button>
          <button className="ql-localVideo" type="button">Video</button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean" />
        </span>
      </div>
      <div className="rounded-[1.4rem] border border-[rgba(214,219,223,0.95)] bg-white/90 shadow-sm">
        <div ref={containerRef} className="quill-editor min-h-56" />
      </div>
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
      <input ref={videoInputRef} type="file" accept="video/mp4,video/*" className="hidden" onChange={handleVideoFile} />
      <input type="hidden" name={name} value={value} readOnly />
    </div>
  )
}

export const RichTextEditor = memo(RichTextEditorComponent)
