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

export function BFS<T>(
  queue: GraphQueue<T>,
  getNeighbours: (item: GraphNode<T>) => GraphNode<T>[],
  predicate: (item: T) => boolean
): T[] {
  const result: T[] = [];
  const distance = 0;
  while (queue.length > 0) {
    const node: GraphNode<T> = queue.dequeue()!;

    node.status = "processing";
    node.distance = distance;

    for (let cell of getNeighbours(node)) {
      if (cell.status === "unprocessed" && predicate(cell.item)) {
        cell.distance = distance + 1;
        queue.enqueue(cell);
      }
    }

    node.status = "processed";
    result.push(node.item);
  }
  return result;
}
