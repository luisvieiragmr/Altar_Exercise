"use client";
import styles from "./page.module.css";
import { SubmitButton } from "./submit";
import { createMatrix } from "./actions";
import { useState, useEffect, useRef } from "react";
import { Grid } from "./grid";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [code, setCode] = useState("");
  const [matrix, setMatrix] = useState<(string | null)[][]>(
    Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => null))
  );
  const weightRef = useRef<string | undefined>();

  useEffect(() => {
    if (submitted) {
      const interval = setInterval(async () => {
        const newMatrix = await createMatrix(weightRef.current);
        setMatrix(newMatrix.matrix);
        setCode(newMatrix.code);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [submitted]);

  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        action={async (formData) => {
          const weight = formData.get("weight") as string;
          console.log(weight);

          if (weight) {
            weightRef.current = weight;
            setIsInputDisabled(true);
            setTimeout(() => {
              setIsInputDisabled(false);
            }, 4000);
          }

          setSubmitted(true);
          const matrix = await createMatrix(weight);
          setMatrix(matrix.matrix);
          setCode(matrix.code);
        }}
      >
        <div className={styles.formContent}>
          <div className={styles.formInputContainer}>
            <label htmlFor="weight">Character</label>
            <input
              className={styles.formInput}
              type="text"
              id="weight"
              name="weight"
              disabled={isInputDisabled}
              aria-label="Enter a character to generate a matrix"
              aria-disabled={isInputDisabled}
            />
          </div>
          <div>
            <SubmitButton />
          </div>
        </div>
      </form>
      <div>
        <Grid matrix={matrix} />
      </div>

      <div aria-live="polite">
        <div className={styles.codeStatusContainer}>
          {submitted ? (
            <span className={styles.red} />
          ) : (
            <span className={styles.gray} />
          )}
          <p className={styles.statusText}>live</p>
        </div>
        <div className={styles.code}>{code}</div>
      </div>
    </main>
  );
}
