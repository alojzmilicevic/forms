import type { Block } from "@/manifest.type";
import styles from './preview.module.scss';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { renderPreviewBlock } from "@/blocks/block-factory";

type PreviewProps = {
    blocks: Block[];
    mode: 'edit' | 'preview';
    setEditorMode: () => void;
}

const ReturnButton = ({ setEditorMode }: { setEditorMode: () => void }) => {
    return (
        <div className={styles.returnButtonContainer}>
            <button className={styles.returnButton} onClick={setEditorMode}>
                <ChevronLeftIcon className={styles.chevronIcon} />
                Back to editor
            </button>
        </div>
    )
}

export const Preview = ({ blocks, mode, setEditorMode }: PreviewProps) => {
    if (mode !== 'preview') return null;

    console.log(blocks);
    return (
        <div className={styles.preview}>
            <ReturnButton setEditorMode={setEditorMode} />
            <div className={styles.previewContainer}>
                <div className={styles.previewContent}>
                    <h1>Forms App</h1>
                    {blocks.map((block) => renderPreviewBlock({ block, onUpdate: () => {} }))}
                </div>
            </div>
        </div>
    )
}