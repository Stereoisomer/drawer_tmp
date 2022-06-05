export class GraphQueue<T> {
  private queue: GraphNode<T>[] = [];

  get length(): number {
    return this.queue.length;
  }

  enqueue(node: GraphNode<T>): number {
    return this.queue.push(node);
  }

  dequeue(): GraphNode<T> | undefined {
    return this.queue.shift();
  }
}

export class GraphNode<T> {
  constructor(
    public item: T,
    public status: "unprocessed" | "processing" | "processed" = "unprocessed",
    public parent?: GraphNode<T>, // for computing tree
    public distance: number = -1 // distance from source node
  ) {}
}
