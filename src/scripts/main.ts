module CV {
    export class ViewAnimations {
        private static instance:ViewAnimations = new ViewAnimations();

        static start() {
            ViewAnimations.instance.startTimeline();
        }

        private toggleTimelineElementClasses(titleElement:HTMLElement) {
            var chevrons = titleElement.querySelectorAll('i.fa');
            for(var j = 0; j < chevrons.length; j++) {
                var chevron = <HTMLElement> chevrons[j];
                chevron.classList.toggle('hidden');
            }
            var body = <HTMLElement> titleElement.parentElement.parentElement.querySelector('.timeline-body');
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
    }
}
CV.ViewAnimations.start();