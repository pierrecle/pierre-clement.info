/// <reference path="../../typings/tsd.d.ts"/>

module CV {
  export class ViewAnimations {
    private previousScrollTop:number = 0;

    private static instance:ViewAnimations = new ViewAnimations();
    private sidebarElement:HTMLElement = document.getElementById("sidebar");
    private contentElement:HTMLElement = document.getElementById("content");
    private sidebarX:number = 0;

    static start() {
      ViewAnimations.instance.startTimeline();
      ViewAnimations.instance.startToggleSidebar();
      ViewAnimations.instance.startFastClick();
    }

    private toggleTimelineElementClasses(titleElement:HTMLElement) {
      var chevrons = titleElement.querySelectorAll('i.fa');
      for(var j = 0; j < chevrons.length; j++) {
        var chevron = <HTMLElement> chevrons[j];
        chevron.classList.toggle('hidden');
      }
      var body:Element = titleElement.parentElement.parentElement.querySelector('.timeline-body');
      body.classList.toggle('hidden');
    }

    private startTimeline() {
      var elementsTitle = document.querySelectorAll('.timeline-heading h2');
      for(var i = 0; i < elementsTitle.length; i++) {
        ((i) => {
          var elementTitle = <HTMLElement>elementsTitle[i];
          elementTitle.onclick = () => {
            this.toggleTimelineElementClasses(elementTitle);
          };
        })(i);
      }
    }

    private startToggleSidebar() {
      document.getElementById("toggle-sidebar").addEventListener("click", () => {
        this.toggleSidebar();
      }, false);
      document.querySelector("#content > div").addEventListener("click", () => {
        this.hideSidebar();
      }, false);
      window.addEventListener("orientationchange", () => {
        this.hideSidebar();
      }, false);
    }

    private toggleSidebar() {
      this.isSidebarVisible() ? this.hideSidebar() : this.showSidebar();
    }

    private isSidebarVisible():boolean {
      return this.sidebarElement.classList.contains("visible");
    }

    private showSidebar() {
      if (!this.isSidebarVisible()) {
        this.previousScrollTop = document.body.scrollTop;
        this.contentElement.style.top = "-" + this.previousScrollTop + "px";
        this.sidebarElement.classList.add("visible");
        this.contentElement.classList.add("sidebar-visible");
      }
    }

    private hideSidebar() {
      if (this.isSidebarVisible()) {
        this.sidebarElement.classList.remove("visible");
        this.contentElement.classList.remove("sidebar-visible");
        this.contentElement.style.top = "0";
        window.scrollTo(0, this.previousScrollTop);
      }
    }

    private startFastClick() {
      FastClick.attach(document.body);
    }
  }
}
CV.ViewAnimations.start();
