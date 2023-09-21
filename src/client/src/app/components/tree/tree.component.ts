/******************************************************************************
 * @Author                : Quentin<quentin@halfsquare.fr>                    *
 * @CreatedDate           : 2023-09-19 11:14:55                               *
 * @LastEditors           : Quentin<quentin@halfsquare.fr>                    *
 * @LastEditDate          : 2023-09-19 12:44:36                               *
 *****************************************************************************/

import { Component, Input } from '@angular/core';

/**
 * Interface for defining a tree node
 */
interface TreeNode {
  label: string;
  status?: string;
  link?: string;
  children?: TreeNode[];
  isExpanded?: boolean;
}

/**
 * Tree component for displaying a hierarchical tree structure
 */
@Component({
  selector: 'component-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent {
  /**
   * Input property to provide tree data for rendering the tree structure
   */
  @Input()
  treeData!: TreeNode[];

  /**
   * Lifecycle hook: ngOnInit
   * This method is executed when the component is initialized.
   */
  ngOnInit() {
    this.initializeNodeState(this.treeData);
  }

  /**
   * Recursive function to initialize the state of nodes in the tree
   * @param nodes The array of tree nodes to initialize
   */
  private initializeNodeState(nodes: TreeNode[]) {
    if (nodes) {
      nodes.forEach(node => {
        node.isExpanded = false;
        if (node.children) {
          this.initializeNodeState(node.children);
        }
      });
    }
  }

  /**
   * Function to toggle the expansion state of a node (expand/collapse)
   * @param node The tree node to toggle
   */
  public toggleNode(node: TreeNode) {
    node.isExpanded = !node.isExpanded;
  }
}
