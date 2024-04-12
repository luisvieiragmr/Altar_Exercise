import React from "react";
import type { Matrix, MatrixCell } from "./types";

export const Grid: React.FC<Matrix> = ({ matrix }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
      }}
    >
      {matrix.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{ display: "grid", gridTemplateRows: "1fr", gridGap: "1px" }}
        >
          {row.map((cell: MatrixCell, cellIndex) => {
            return (
              <div
                key={cellIndex}
                style={{
                  color: "black",
                  width: "50px",
                  height: "50px",
                  backgroundColor: "white",
                  border: "1px solid grey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cell}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
