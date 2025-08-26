import styled from "styled-components";
import type { IconButtonProps } from "../types";

const SquareButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid #dc3546;
  background-color: #dc3545;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

function IconButton({ ariaLabel, onClick }: IconButtonProps) {
  return (
    <SquareButton aria-label={ariaLabel} onClick={onClick} title={ariaLabel}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9 3h6a1 1 0 0 1 1 1v1h4v2H4V5h4V4a1 1 0 0 1 1-1zm1 2v0h4V5h-4zM6 9h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9zm4 2v8h2v-8h-2zm4 0v8h2v-8h-2z" />
      </svg>
    </SquareButton>
  );
}

export default IconButton;
