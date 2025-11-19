/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        "disable-zoom"?: boolean;
        "shadow-intensity"?: string;
        exposure?: string;
      };
    }
  }
}

export {};
