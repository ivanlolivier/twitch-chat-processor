class CommandsContainer {
  addCommand(name: string, cb: () => void) {
    this[name] = cb;
  }
}

export default CommandsContainer;
