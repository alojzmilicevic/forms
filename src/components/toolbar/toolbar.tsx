import styles from './toolbar.module.scss';

interface ToolbarProps {
  onPreviewClick: () => void;
}

export const Toolbar = ({ onPreviewClick }: ToolbarProps) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarContent}>
        <div className={styles.toolbarLeft}></div>
        <div className={styles.toolbarRight}>
          <button onClick={onPreviewClick}>Preview</button>
        </div>
      </div>
    </div>
  );
};

