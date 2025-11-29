import { useEffect, useRef, useState } from "react";

type Size = {
  width: number;
  height: number;
};

const RED_CONTAINER_WIDTH = 1024;
const WRAPPER_PADDING = 16;

const useResizeObserver = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const element = ref.current;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const { width, height } = entry.contentRect;

      // contentRect.width не включает паддинги, добавляем их вручную,
      // чтобы size.width соответствовал реальной ширине wrapper на экране
      const outerWidth = width + WRAPPER_PADDING * 2;
      const outerHeight = height + WRAPPER_PADDING * 2;

      setSize({ width: outerWidth, height: outerHeight });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, size };
};

const Resize = () => {
  const { ref: wrapperRef, size } = useResizeObserver<HTMLDivElement>();

  const wrapperWidth = size.width > 0 ? size.width : 0;
  const innerAvailableWidth =
    wrapperWidth > 0 ? Math.max(wrapperWidth - WRAPPER_PADDING * 2, 0) : 0;

  const shouldScale =
    innerAvailableWidth > 0 && innerAvailableWidth < RED_CONTAINER_WIDTH;
  const scale = shouldScale ? innerAvailableWidth / RED_CONTAINER_WIDTH : 1;

  console.log("size:", size.width);
  console.log("scale:", scale);

  console.log("calculated div width:", RED_CONTAINER_WIDTH * scale);

  return (
    <div
      ref={wrapperRef}
      style={{
        boxSizing: "border-box",
        width: "100%",
        minHeight: "100vh",
        padding: WRAPPER_PADDING,
        backgroundColor: "#1e3a8a", // blue
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          width: RED_CONTAINER_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          backgroundColor: "#b91c1c", // red
          color: "#fff",
          padding: 40,
          borderRadius: 8,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
          margin: "0 auto",
           display: "flex",
        }}
      >
        <h1 style={{ fontSize: 32, marginBottom: 24 }}>
          Understanding Responsive Design
        </h1>

        <div style={{ marginBottom: 32 }}>
          <img
            src="https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=Responsive+Design+Illustration"
            alt="Responsive Design"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>

        <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 20 }}>
          Responsive design is a web development approach that creates dynamic
          changes to the appearance of a website, depending on the screen size
          and orientation of the device being used to view it. This approach has
          become essential in modern web development as users access websites
          from a wide variety of devices.
        </p>

        <h2 style={{ fontSize: 24, marginTop: 32, marginBottom: 16 }}>
          Key Principles
        </h2>

        <ul style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
          <li>
            <strong>Fluid Grids:</strong> Layouts are built using relative units
            like percentages rather than fixed units like pixels.
          </li>
          <li>
            <strong>Flexible Images:</strong> Images are sized in relative units
            to prevent them from displaying outside their containing element.
          </li>
          <li>
            <strong>Media Queries:</strong> CSS rules that apply different
            styles based on the characteristics of the device.
          </li>
        </ul>

        <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 20 }}>
          This page demonstrates a different approach: when the available width
          inside the blue wrapper becomes smaller than 1024px, the red content
          area scales down proportionally to stay fully visible, similar to how
          Chrome DevTools handles device emulation.
        </p>
      </div>
    </div>
  );
};

export default Resize;
