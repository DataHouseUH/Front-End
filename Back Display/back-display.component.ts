/** TODO: Implement alert interface */

import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;   /** Includes Last, First */
  petID: string;
  /** Arrived, Inspected, Release -- Checkboxes */
}

const ELEMENT_DATA: ownerInfo[] = [];   /** Wherever our data will come from */

@Component({
  selector: 'app-back-display',
  styleUrls: ['back-display.component.css'],
  templateUrl: 'back-display.component.html',
})
export class {
  displayedColumns: string[] = ['name', 'petID', 'arrived', 'inspected', 'release'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);  /** For status checkboxes */

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
