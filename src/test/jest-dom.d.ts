import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeDisabled(): R;
      toContainElement(element: HTMLElement | null): R;
      toBeVisible(): R;
      toBeEmpty(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: string | string[] | number): R;
      toBeChecked(): R;
      toHaveStyle(css: Record<string, any>): R;
      toHaveFocus(): R;
    }
  }
}
