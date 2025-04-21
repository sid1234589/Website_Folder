
class MyComponent extends HTMLElement {
    constructor() {
        super();
    }

    // connectedCallback is invoked each time the custom element is appended into a document-connected element.
    connectedCallback() {
        // Parse configuration and settings from attributes safely.
        const wixconfig = JSON.parse(this.getAttribute('wixconfig') || '{}');
        const wixsettings = JSON.parse(this.getAttribute('wixsettings') || '{}');

        // Extract instanceId from configuration.
        const instanceId = wixconfig.instanceId || '';

        // Set the element to be displayed.
        // this.style.display = 'block';
        // this.style.width = '100%';

        this.setAttribute('style', 'display:block;width:100%')

        // Fetch the quiz data from your API and render it within the component.
        this.fetchAndDisplayQuiz(instanceId);

        // Example conditional rendering based on settings (commented out by default).
        // this.renderBasedOnSettings(wixsettings);
    }

    fetchAndDisplayQuiz(instanceId) {
        fetch(`https://api.quizell.com/api/load-quiz-preview/${instanceId}`)
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
            })
            .catch(err => {
                console.error('Failed to fetch quiz data:', err);
            });
    }

    // Example function for rendering content based on component settings.
    renderBasedOnSettings(wixsettings) {
        this.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; height: 100vh; background: #F0F8FF;">
        ${wixsettings.dropDown === "Dog" ? "<h1>This is a Dog</h1>" : "<h1>This is a Cat</h1>"}
      </div>
    `;
    }
}

// Define the custom element with a tag name. Ensure the tag name contains a hyphen to avoid conflicts with future HTML elements.
customElements.define("quiz-embed", MyComponent);



// class MyComponent extends HTMLElement {
//     constructor() {
//         super();
//     }
//     // Will be called with new wixsettings data for each change to the component data in the editor.
//     // Will be called once on live/preview mode (on page load)
//     connectedCallback() {
//         const wixconfig = JSON.parse(this?.attributes?.wixconfig?.value ?? '{}');
//         const wixsettings = JSON.parse(this?.attributes?.wixsettings?.value ?? '{}');

//         // current instanceId
//         const instanceId = wixconfig?.instanceId || '';

//         this.setAttribute('style', 'display:block;width:100%')
//         let me = this;
//         fetch('https://api.quizell.com/api/load-quiz-preview/' + instanceId)
//             .then(function (response) {
//                 return response.text()
//             })
//             .then(function (html) {
//                 me.innerHTML = html;
//             })
//             .catch(function (err) {
//                 console.log('Failed to fetch page: ', err);
//             });

//         /* Will work if a dropdown field is added to the settings panel in the Developers Center
//         with the 'dropDown' key and two options e.g., 'Dog' and 'Cat'.*/
//         /*
//           this.innerHTML = `
//           <div style="display: flex;
//               align-items: center;
//               justify-content: center;
//               flex-direction: column;
//               width: 100%;
//               height: 100vh;
//               background: #F0F8FF;
//             ">
//      ${wixsettings.dropDown === "Dog"? "<h1>This is a Dog</h1>" : "<h1>This is a Cat</h1>"}
//           </div>
//         `
//         */
//     }
// }
// customElements.define("quiz-embed", MyComponent);
