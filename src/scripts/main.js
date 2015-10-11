var CV;
(function (CV) {
    var ViewAnimations = (function () {
        function ViewAnimations() {
            this.previousScrollTop = 0;
            this.sidebarElement = document.getElementById("sidebar");
            this.contentElement = document.getElementById("content");
            this.sidebarX = 0;
        }
        ViewAnimations.start = function () {
            ViewAnimations.instance.startTimeline();
            ViewAnimations.instance.startToggleSidebar();
            ViewAnimations.instance.startFastClick();
        };
        ViewAnimations.prototype.toggleTimelineElementClasses = function (titleElement) {
            var chevrons = titleElement.querySelectorAll('i.fa');
            for (var j = 0; j < chevrons.length; j++) {
                var chevron = chevrons[j];
                chevron.classList.toggle('hidden');
            }
            var body = titleElement.parentElement.parentElement.querySelector('.timeline-body');
            body.classList.toggle('hidden');
        };
        ViewAnimations.prototype.startTimeline = function () {
            var _this = this;
            var elementsTitle = document.querySelectorAll('.timeline-heading h2');
            for (var i = 0; i < elementsTitle.length; i++) {
                (function (i) {
                    var elementTitle = elementsTitle[i];
                    elementTitle.onclick = function () {
                        _this.toggleTimelineElementClasses(elementTitle);
                    };
                })(i);
            }
        };
        ViewAnimations.prototype.startToggleSidebar = function () {
            var _this = this;
            document.getElementById("toggle-sidebar").addEventListener("click", function () {
                _this.toggleSidebar();
            }, false);
            document.querySelector("#content > div").addEventListener("click", function () {
                _this.hideSidebar();
            }, false);
            window.addEventListener("orientationchange", function () {
                _this.hideSidebar();
            }, false);
        };
        ViewAnimations.prototype.toggleSidebar = function () {
            this.isSidebarVisible() ? this.hideSidebar() : this.showSidebar();
        };
        ViewAnimations.prototype.isSidebarVisible = function () {
            return this.sidebarElement.classList.contains("visible");
        };
        ViewAnimations.prototype.showSidebar = function () {
            if (!this.isSidebarVisible()) {
                this.previousScrollTop = document.body.scrollTop;
                this.contentElement.style.top = "-" + this.previousScrollTop + "px";
                this.sidebarElement.classList.add("visible");
                this.contentElement.classList.add("sidebar-visible");
            }
        };
        ViewAnimations.prototype.hideSidebar = function () {
            if (this.isSidebarVisible()) {
                this.sidebarElement.classList.remove("visible");
                this.contentElement.classList.remove("sidebar-visible");
                this.contentElement.style.top = "0";
                window.scrollTo(0, this.previousScrollTop);
            }
        };
        ViewAnimations.prototype.startFastClick = function () {
            FastClick.attach(document.body);
        };
        ViewAnimations.instance = new ViewAnimations();
        return ViewAnimations;
    })();
    CV.ViewAnimations = ViewAnimations;
})(CV || (CV = {}));
CV.ViewAnimations.start();
