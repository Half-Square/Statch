import { Component, Input } from "@angular/core";

@Component({
  selector: "section-ptt-header",
  templateUrl: "./ptt-header.section.html",
  styleUrls: ["./ptt-header.section.scss"]
})
export class PttHeaderSection {
  @Input()
    edit: boolean = false;

  @Input()
    title: string = "";

  @Input()
    description: string = "";
}
