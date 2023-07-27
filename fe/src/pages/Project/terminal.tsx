import { IRequest, apiHttp } from "@/utils/http";
import { stringify } from "qs";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";

import "xterm/css/xterm.css";

function printRed(str: string) {
  return `\x1B[1;3;31${str}\x1B[0m`;
}
const JennkisTerminal: React.FC<{ name: string }> = ({ name }) => {
  const termRootRef = useRef<HTMLDivElement>(null);
  const terminal = new Terminal();

  async function getJenkinsConsole() {
    const { data } = await apiHttp.get<IRequest>(
      `cicd`,
      {
        name,
      },
      {
        beforeRequestCallback: (config: Record<string, string>) => {
          config["timeout"] = "100000";
          return config;
        },
      }
    );
    return data;
  }

  async function init(termRoot: HTMLDivElement) {
    try {
      terminal.open(termRoot);
      const str = await getJenkinsConsole();
      //TODO: str if fount Finished: SUCCESS end else next request
      const lines = str.split("\n");
      Array.isArray(lines) &&
        lines.forEach((line) => {
          terminal.write(line + "\n");
        });
    } catch (e) {
      const { response } = e as Record<string, any>;
      const { message } = response?.data || {};
      terminal.write(message || String(e));
    }
  }
  useEffect(() => {
    const termRoot = termRootRef.current;
    if (!termRoot) {
      throw new Error(`No terminal root found`);
    }
    init(termRoot);
    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={termRootRef} />;
};

export default JennkisTerminal;
