import { create } from 'zustand'
import type {
  Block,
  BlockType,
  CheckboxBlock,
  ColorBlock,
  DividerBlock,
  Manifest,
  NumberInputBlock,
  TextInputBlock,
} from '@/manifest.type'
import { isGroupableBlock } from '@/manifest.type'

type EditorStore = {
  // State
  manifest: Manifest
  mode: 'edit' | 'preview'
  focusedGroup: string | null

  // Actions
  setMode: (mode: 'edit' | 'preview') => void
  setFocusedGroup: (groupId: string | null) => void
  addBlock: (blockType: BlockType, groupId?: string) => void
  deleteBlock: (blockId: string) => void
  updateBlock: (blockId: string, updates: Partial<Block>) => void
  updateName: (name: string) => void
}

const recalculateGroup = (blocks: Block[], groupId: string): Block[] => {
  const groupBlocks = blocks.filter((b) => isGroupableBlock(b) && b.groupId === groupId)
  const maxIndex = groupBlocks.length - 1

  const groupIndexMap = new Map<string, number>()
  groupBlocks.forEach((block, index) => {
    groupIndexMap.set(block.id, index)
  })

  return blocks.map((b) => {
    if (isGroupableBlock(b) && b.groupId === groupId) {
      const newGroupIndex = groupIndexMap.get(b.id) ?? b.groupIndex
      return {
        ...b,
        groupIndex: newGroupIndex,
        isLast: newGroupIndex === maxIndex,
        isFirst: newGroupIndex === 0,
      }
    }
    return b
  })
}

const createBlock = (blockType: BlockType, blocks: Block[], groupId?: string): Block => {
  const baseBlock = {
    id: crypto.randomUUID(),
    order: blocks.length,
  }

  switch (blockType) {
    case 'textinput': {
      const textInputBlock: TextInputBlock = {
        ...baseBlock,
        type: 'textinput',
        placeholder: '',
        maxLength: 255,
        minLength: 0,
        required: false,
      }
      return textInputBlock
    }
    case 'divider': {
      const dividerBlock: DividerBlock = {
        ...baseBlock,
        type: 'divider',
        orientation: 'horizontal',
      }
      return dividerBlock
    }
    case 'number': {
      const numberBlock: NumberInputBlock = {
        ...baseBlock,
        type: 'number',
        placeholder: '',
        max: 20,
        min: 0,
        required: false,
      }
      return numberBlock
    }
    case 'h1':
      return { ...baseBlock, type: 'h1', value: 'Heading 1' } as const
    case 'h2':
      return { ...baseBlock, type: 'h2', value: 'Heading 2' } as const
    case 'h3':
      return { ...baseBlock, type: 'h3', value: 'Heading 3' } as const
    case 'text':
      return { ...baseBlock, type: 'text', value: '' } as const
    case 'color': {
      const colorBlock: ColorBlock = {
        ...baseBlock,
        type: 'color',
        color: '#000000',
      }
      return colorBlock
    }
    case 'checkbox': {
      const gId = groupId || crypto.randomUUID()
      const gIndex = groupId
        ? blocks.filter((b) => b.type === 'checkbox' && b.groupId === groupId).length
        : 0

      const checkboxBlock: CheckboxBlock = {
        ...baseBlock,
        type: 'checkbox',
        checked: false,
        label: '',
        groupId: gId,
        groupIndex: gIndex,
        isLast: gIndex === blocks.filter((b) => b.type === 'checkbox' && b.groupId === groupId).length,
        isFirst: gIndex === 0,
      }
      return checkboxBlock
    }
    default:
      throw new Error(`Unknown block type: ${blockType}`)
  }
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  manifest: {
    name: 'Title',
    description: '',
    blocks: [],
  },
  mode: 'edit',
  focusedGroup: null,

  setMode: (mode) => set({ mode }),

  setFocusedGroup: (groupId) => set({ focusedGroup: groupId }),

  addBlock: (blockType, groupId) => {
    const { manifest } = get()
    const { blocks } = manifest
    const block = createBlock(blockType, blocks, groupId)
    let newBlocks: Block[]

    if (isGroupableBlock(block)) {
      const groupBlocks = blocks.filter((b) => isGroupableBlock(b) && b.groupId === block.groupId)
      if (groupBlocks.length > 0) {
        const lastGroupBlock = groupBlocks[groupBlocks.length - 1]
        const insertIndex = blocks.findIndex((b) => b.id === lastGroupBlock.id) + 1

        newBlocks = [...blocks.slice(0, insertIndex), block, ...blocks.slice(insertIndex)]
        newBlocks = newBlocks.map((b, index) => ({ ...b, order: index }))
      } else {
        newBlocks = [...blocks, block]
      }

      set({
        manifest: {
          ...manifest,
          blocks: recalculateGroup(newBlocks, block.groupId),
        },
      })
    } else {
      newBlocks = [...blocks, block]
      set({
        manifest: {
          ...manifest,
          blocks: newBlocks,
        },
      })
    }
  },

  deleteBlock: (blockId) => {
    const { manifest, focusedGroup, setFocusedGroup } = get()
    const { blocks } = manifest
    const blockToDelete = blocks.find((b) => b.id === blockId)
    let newBlocks = blocks.filter((block) => block.id !== blockId)

    // Update order for all remaining blocks
    newBlocks = newBlocks.map((b, index) => ({ ...b, order: index }))

    if (blockToDelete && isGroupableBlock(blockToDelete)) {
      const updatedBlocks = recalculateGroup(newBlocks, blockToDelete.groupId)

      // If the deleted block was in the focused group and the group is now empty, clear focus
      const remainingGroupBlocks = updatedBlocks.filter(
        (b) => isGroupableBlock(b) && b.groupId === blockToDelete.groupId
      )
      if (focusedGroup === blockToDelete.groupId && remainingGroupBlocks.length === 0) {
        setFocusedGroup(null)
      }

      set({
        manifest: {
          ...manifest,
          blocks: updatedBlocks,
        },
      })
    } else {
      set({
        manifest: {
          ...manifest,
          blocks: newBlocks,
        },
      })
    }
  },

  updateBlock: (blockId, updates) => {
    const { manifest } = get()
    set({
      manifest: {
        ...manifest,
        blocks: manifest.blocks.map((b) => {
          if (b.id === blockId) {
            return { ...b, ...updates } as Block
          }
          return b
        }),
      },
    })
  },

  updateName: (name) => {
    const { manifest } = get()
    set({
      manifest: {
        ...manifest,
        name,
      },
    })
  },
}))
