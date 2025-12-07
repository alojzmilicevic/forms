import { BlockWrapper } from '@/blocks/block-wrapper/block-wrapper'
import { Button } from '@/components/button/button'
import { Search } from './search/search'
import { EditableText } from '@/blocks/components/editable-text/editable-text'
import { useEditor } from './use-editor.hook'
import styles from './editor.module.scss'

export const Editor = () => {
  const { editorRef, blocks, name, updateName, addBlock, renderBlockComponent } = useEditor()

  return (
    <div ref={editorRef} className={styles.editor}>
      <EditableText value={name} onChange={updateName} tag="h1" editable={true} />
      <div className={styles.blocksContainer}>
        {blocks.map((block) => {
          const result = renderBlockComponent(block)
          if (!result) return null

          const { blockElement, wrapperProps } = result
          return (
            <BlockWrapper key={block.id} {...wrapperProps}>
              {blockElement}
            </BlockWrapper>
          )
        })}
      </div>
      <Search onAddBlock={addBlock} />
      <Button label="Submit" onClick={() => console.log('Button clicked')} rightIcon="➤" />
    </div>
  )
}
