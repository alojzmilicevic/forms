type Manifest = {
    name: string;
    description: string;
    blocks: Block[];
}

type Block = {
    id: string;
    order: number;
    required: boolean;
    type: BlockType;
}

type TextfieldBlock = Block & {
    type: "textfield";
    placeholder: string;
    maxLength: number;
    minLength: number;
}

type DividerBlock = Block & {
    type: "divider";
    orientation: "horizontal" | "vertical";
}

type BlockType = "textfield" | "divider";
type BlockVariant = TextfieldBlock | DividerBlock;

const BLOCK_TYPES: BlockType[] = ["textfield", "divider"];

export type { Manifest, Block, TextfieldBlock, DividerBlock, BlockType, BlockVariant };
export { BLOCK_TYPES };
