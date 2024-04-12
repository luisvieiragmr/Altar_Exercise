"use server";

type MatrixCell = string | null;

type Matrix = MatrixCell[][];

const generateCode = (matrix: Matrix): string => {
  const currentTime = new Date();
  const seconds = currentTime.getSeconds();
  const formattedSeconds = ("0" + seconds).slice(-2);

  const charArray: string[] = formattedSeconds.split("");
  const [char0, char1] = charArray;

  const codeitem0 = matrix[parseInt(char0)][parseInt(char1)];
  const codeitem1 = matrix[parseInt(char1)][parseInt(char0)];

  let codeitem0Count = 0;
  let codeitem1Count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === codeitem0) {
        codeitem0Count++;
      }
      if (matrix[i][j] === codeitem1) {
        codeitem1Count++;
      }
    }
  }

  let divisor = 1;
  while (codeitem0Count > 9 || codeitem1Count > 9) {
    divisor++;
    codeitem0Count = Math.floor(codeitem0Count / divisor);
    codeitem1Count = Math.floor(codeitem1Count / divisor);
  }

  return codeitem0Count.toString() + codeitem1Count.toString();
};

const generateRandomChar = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars[Math.floor(Math.random() * chars.length)];
};

export async function createMatrix(weightChar?: string) {
  const matrix: Matrix = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => null)
  );

  // Calculate number of weight characters (20% of total)
  const numWeightChars = Math.floor(0.2 * matrix.length * matrix[0].length);
  if (weightChar) {
    // Place weight characters in random positions
    for (let i = 0; i < numWeightChars; i++) {
      let placed = false;
      while (!placed) {
        const randomRow = Math.floor(Math.random() * matrix.length);
        const randomCol = Math.floor(Math.random() * matrix[0].length);
        if (!matrix[randomRow][randomCol]) {
          matrix[randomRow][randomCol] = weightChar.toUpperCase();
          placed = true;
        }
      }
    }
  }

  // Fill remaining slots with random characters
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!matrix[i][j]) {
        matrix[i][j] = generateRandomChar();
      }
    }
  }

  const code = generateCode(matrix);
  return { matrix, code };
}
