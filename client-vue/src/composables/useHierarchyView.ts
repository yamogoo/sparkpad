import { HierarchyNodeTypes, type HierarchyNode } from "@/typings";

export class HierarchyView {
  /**
   * @description Type of node (dir<0x00> or file<0x01>)
   */
  static getNodeType(node: HierarchyNode): HierarchyNodeTypes {
    return "children" in node && Array.isArray(node.children)
      ? HierarchyNodeTypes.DIR
      : HierarchyNodeTypes.FILE;
  }

  /**
   * @description Formation of a tree of nodes
   */
  static createTree<D, F>(
    dirs: Array<HierarchyNode>,
    files: Array<HierarchyNode>
  ) {
    const nodesMap: { [key: string]: HierarchyNode } = {};

    dirs.forEach((dir) => {
      nodesMap[dir.id] = { ...dir, children: [] };
    });

    const tree: Array<HierarchyNode> = [];

    for (const file of files) {
      if (file.parentId !== null) {
        nodesMap[file.parentId].children!.push(file);
      } else if (file.parentId === null) {
        tree.push(file);
      }
    }

    dirs.forEach((item) => {
      const { parentId } = item;

      if (parentId && nodesMap[parentId]) {
        nodesMap[parentId].children!.push(nodesMap[item.id]);
      } else {
        tree.push(nodesMap[item.id]);
      }
    });

    return tree;
  }
}
