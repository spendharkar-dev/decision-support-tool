document.addEventListener('DOMContentLoaded', function() {
    const formContent = document.getElementById('formContent');

    const questions = [
    {
        section: "Round 1",
        questions: [
            { label: "Please describe your experience with AI (Round 1):", type: "text", round: "1" },
            { label: "Select your preferred AI tool (Round 1):", type: "select", options: ["Tool A", "Tool B", "Tool C"], round: "1" },
            { label: "Select the AI features you use (Round 1):", type: "checkbox", options: ["Feature 1", "Feature 2", "Feature 3"], round: "1" },
            { label: "Select your role or specify other (Round 1):", type: "radio", options: ["Developer", "Manager", "Analyst", "Other"], round: "1" },
            { label: "If other, please specify (Round 1):", type: "text", conditional: "Other", round: "1" }
        ]
    },
    {
        section: "Round 2",
        questions: [
            { label: "Please describe your experience with AI (Round 2):", type: "text", round: "2" },
            { label: "Select your preferred AI tool (Round 2):", type: "select", options: ["Tool A", "Tool B", "Tool C"], round: "2" },
            { label: "Select the AI features you use (Round 2):", type: "checkbox", options: ["Feature 1", "Feature 2", "Feature 3"], round: "2" },
            { label: "Select your role or specify other (Round 2):", type: "radio", options: ["Developer", "Manager", "Analyst", "Other"], round: "2" },
            { label: "If other, please specify (Round 2):", type: "text", conditional: "Other", round: "2" }
        ]
    },
    {
        section: "Free Form Text",
        questions: [
            { label: "Please describe your experience with AI:", type: "text" }
        ]
    },
    {
        section: "Single Selection",
        questions: [
            { label: "Select your preferred AI tool:", type: "select", options: ["Tool A", "Tool B", "Tool C"] }
        ]
    },
    {
        section: "Multiple Choice",
        questions: [
            { label: "Select the AI features you use:", type: "checkbox", options: ["Feature 1", "Feature 2", "Feature 3"] }
        ]
    },
    {
        section: "Other Option",
        questions: [
            { label: "Select your role or specify other:", type: "radio", options: ["Developer", "Manager", "Analyst", "Other"] }
        ]
    },
    {
        section: "Other Text",
        questions: [
            { label: "If other, please specify:", type: "text", conditional: "Other" }
        ]
    },
        {
            section: "Risk Profiles",
            questions: [
                { label: "How would you rate your organization's readiness for AI adoption?", type: "select", options: ["Not Ready", "Somewhat Ready", "Ready", "Very Ready"] },
                { label: "What is your organization's risk appetite regarding AI implementation?", type: "select", options: ["Low", "Medium", "High"] }
            ]
        },
        {
            section: "Objectives",
            questions: [
                { label: "What tasks are you looking to optimize using Generative AI?", type: "text" },
                { label: "What are the expected outcomes from using Generative AI?", type: "text" }
            ]
        },
        {
            section: "Success Metrics",
            questions: [
                { label: "How do you plan to measure time saved through AI implementation?", type: "text" },
                { label: "What quality improvements do you expect from AI solutions?", type: "text" },
                { label: "How will you assess cost reduction achieved by AI?", type: "text" }
            ]
        }
    ];

    questions.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'form-section';
        const sectionTitle = document.createElement('h3');
        sectionTitle.textContent = section.section;
        sectionDiv.appendChild(sectionTitle);

        section.questions.forEach(q => {
            const questionLabel = document.createElement('label');
            questionLabel.textContent = q.label;
            sectionDiv.appendChild(questionLabel);

            if (q.type === 'select') {
                const select = document.createElement('select');
                q.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    select.appendChild(opt);
                });
                sectionDiv.appendChild(select);
            } else if (q.type === 'checkbox') {
                q.options.forEach(option => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = option;
                    const label = document.createElement('label');
                    label.textContent = option;
                    sectionDiv.appendChild(checkbox);
                    sectionDiv.appendChild(label);
                    sectionDiv.appendChild(document.createElement('br'));
                });
            } else if (q.type === 'radio') {
                q.options.forEach(option => {
                    const radio = document.createElement('input');
                    radio.type = 'radio';
                    radio.name = q.label;
                    radio.value = option;
                    const label = document.createElement('label');
                    label.textContent = option;
                    sectionDiv.appendChild(radio);
                    sectionDiv.appendChild(label);
                    sectionDiv.appendChild(document.createElement('br'));
                });
            } else if (q.type === 'text' && q.conditional) {
                const input = document.createElement('input');
                input.type = 'text';
                input.style.display = 'none';
                sectionDiv.appendChild(input);

                const radios = sectionDiv.querySelectorAll(`input[type=radio][name='${q.label}']`);
                radios.forEach(radio => {
                    radio.addEventListener('change', function() {
                        if (this.value === q.conditional) {
                            input.style.display = 'block';
                        } else {
                            input.style.display = 'none';
                        }
                    });
                });
            } else
                const select = document.createElement('select');
                q.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    select.appendChild(opt);
                });
                sectionDiv.appendChild(select);
            } else if (q.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                sectionDiv.appendChild(input);
            }

            sectionDiv.appendChild(document.createElement('br'));
        });

        formContent.appendChild(sectionDiv);
    });

    document.getElementById('questionnaireForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Form submitted!');
        // Here you can add code to handle form submission, e.g., sending data to a server
    });
});