import { useRef } from "react";
import styles from "./PortfolioPhotoUpload.module.css";

interface PortfolioPhotoUploadProps {
  photo?: string;
  onPhotoChange: (photo?: string) => void;
}

function PortfolioPhotoUpload({
  photo,
  onPhotoChange,
}: PortfolioPhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onPhotoChange(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onPhotoChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.photoBox}>
        {photo ? (
          <img src={photo} alt="Portfolio profile" />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.camera}>📷</span>
            <span>No photo selected</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        hidden
      />

      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.uploadButton}
          onClick={() => inputRef.current?.click()}
        >
          {photo ? "Change Photo" : "Upload Photo"}
        </button>

        {photo && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
          >
            Remove
          </button>
        )}
      </div>

      <p className={styles.note}>JPG, PNG or WEBP • Optional</p>
    </div>
  );
}

export default PortfolioPhotoUpload;
