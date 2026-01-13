document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submit-btn');
    const loginContainer = document.getElementById('login-container');
    const resultContainer = document.getElementById('result-container');
    const regInput = document.getElementById('reg-input');
    const resRegNo = document.getElementById('res-reg-no');
    const resName = document.getElementById('res-name');
    const marksBody = document.getElementById('marks-body');

    // Student Database
    const studentDb = {
        "2422K0630": "AKSHAYA E",
        "2422K0631": "AMAL ROSHAN S",
        "2422K0632": "ARIHARAN R",
        "2422K0633": "ARTHI K",
        "2422K0634": "ASHWIN S",
        "2422K0635": "CYRIL JOSHUVA J",
        "2422K0636": "DEEPIKA V",
        "2422K0637": "DEVANANTHAN S",
        "2422K0638": "DEVAYANI N",
        "2422K0639": "DINESH KUMAR S",
        "2422K0640": "DIWAKAR K",
        "2422K0641": "ELANGO P R",
        "2422K0642": "ESWAR K",
        "2422K0643": "GAUTHAM",
        "2422K0644": "GAYATHRI T",
        "2422K0645": "GOKUL S",
        "2422K0646": "GOWRI K",
        "2422K0647": "GOWTHAM M",
        "2422K0648": "GOWTHAM S",
        "2422K0649": "HANI NETHRA M",
        "2422K0650": "JOSHVA S",
        "2422K0651": "KAVIN SH",
        "2422K0652": "KAVYA S",
        "2422K0653": "KISHOR V",
        "2422K0654": "KRIBA SRI G",
        "2422K0655": "LIBINESH PS",
        "2422K0656": "MEGHA NU",
        "2422K0657": "MENAKA S",
        "2422K0658": "MOHAMED ARZATH P",
        "2422K0659": "MOHAMED FIYAZ H",
        "2422K0660": "MOHAMMED HASHIR M",
        "2422K0661": "MOHAMMED IBRAHIM M",
        "2422K0662": "NEKA SRI S",
        "2422K0663": "NETHRA R",
        "2422K0664": "PREETHI G",
        "2422K0665": "RAGAVAN M",
        "2422K0666": "RAGUL M",
        "2422K0667": "RANGANATHAN NS",
        "2422K0668": "RAYEEZ AHAMED J",
        "2422K0669": "SANDHIYA RAJKUMAR",
        "2422K0670": "SANDHYA V",
        "2422K0671": "SARAVANA KUMAR B",
        "2422K0672": "SIDDHARTH A",
        "2422K0673": "SIVA SUBRAMANI B",
        "2422K0674": "SIVASREE S",
        "2422K0675": "SREE LAKSHMI VP",
        "2422K0676": "SRIKANTH S",
        "2422K0677": "SRUTHI M",
        "2422K0678": "SUDHEEP VS",
        "2422K0679": "VASANTHVEL S",
        "2422K0680": "VIGNESH K",
        "2422K0682": "VINOTHINI V",
        "2422K0683": "VINUSATHISH V",
        "2422K0684": "VISHAL BADRINATH S",
        "2422K0685": "YAMUNA U",
        "2422K0686": "YUVARAJ D"
    };

    // Subjects List
    const subjects = [
        { code: '31T', name: 'TAMIL - III' },
        { code: '32E', name: 'English – III' },
        { code: '33A', name: 'Core 4:Data Structures' },
        { code: '33B', name: 'Core 5:Java Programming' },
        { code: '3AA', name: 'Allied 3:Computer Based Optimization Techniques' },
        { code: '3SA', name: 'Skill based Subject1: Software Engineering And Software Project Management' },
        { code: '3YA', name: 'Yoga for Human Excellence' }
    ];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatMark(num) {
        return num.toString().padStart(3, '0');
    }

    // Function to handle the "login"
    function showResult() {
        // Normalize input: trim, uppercase, and handle common typos (replace letter 'O' with number '0')
        const regNo = regInput.value.trim().toUpperCase().replace(/O/g, '0');

        if (regNo) {
            // Lookup Name
            const studentName = studentDb[regNo];

            if (studentName) {
                // Update the result page with the entered number and name
                resRegNo.textContent = regNo;
                resName.textContent = studentName;

                // Generate Random Marks
                let rowsHTML = '';

                // Determine which indices will fail (2 to 5 fails)
                const numFails = getRandomInt(2, 5);
                const failIndices = new Set();
                while (failIndices.size < numFails) {
                    failIndices.add(getRandomInt(0, subjects.length - 1));
                }

                subjects.forEach((sub, index) => {
                    let internal, external, total, result, markStr;

                    if (failIndices.has(index)) {
                        // Fail Case
                        result = 'F.';
                        internal = getRandomInt(10, 24);
                        external = getRandomInt(5, 25);
                        markStr = `${formatMark(internal)}+${formatMark(external)}`;
                    } else {
                        // Pass Case
                        result = 'P.';
                        internal = getRandomInt(15, 24);
                        external = getRandomInt(30, 70);
                        markStr = `${formatMark(internal)}+${formatMark(external)}`;
                    }

                    if (sub.name.toLowerCase().includes('yoga') || sub.name.toLowerCase().includes('environmental')) {
                        let singleMark = failIndices.has(index) ? getRandomInt(10, 39) : getRandomInt(40, 90);
                        markStr = formatMark(singleMark);
                    }

                    rowsHTML += `
                        <tr>
                            <td>${sub.code}</td>
                            <td>${sub.name}</td>
                            <td>${markStr}</td>
                            <td>${result}</td>
                        </tr>
                    `;
                });

                marksBody.innerHTML = rowsHTML;

                // Switch views: Hide initial disclaimer, show result table
                document.getElementById('initial-view').classList.add('hidden');
                document.getElementById('result-view').classList.remove('hidden');

                // No scroll needed as layout is side-by-side and compact
            } else {
                alert('Register Number Not Found in Database. Verified: 2422K0682 is present.');
            }
        } else {
            alert('Please Enter Register Number');
        }
    }

    submitBtn.addEventListener('click', showResult);

    // Allow pressing Enter key
    regInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            showResult();
        }
    });
});
