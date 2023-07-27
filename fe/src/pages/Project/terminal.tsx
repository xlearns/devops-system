import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

function printRed(str: string) {
  return `\x1B[1;3;31${str}\x1B[0m`;
}
const JennkisTerminal: React.FC<unknown> = () => {
  const termRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const termRoot = termRootRef.current;

    if (!termRoot) {
      throw new Error(`No terminal root found`);
    }

    const terminal = new Terminal();
    terminal.open(termRoot);
    terminal.write("Hello from  $ ");

    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={termRootRef} />;
};

export default JennkisTerminal;
