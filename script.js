
let currentUser = null;
let queries = [
    { id: 'Q001', name: 'Rajesh Kumar', email: 'rajesh@example.com', category: 'academics', question: 'How to improve JEE prep?', desc: 'I\'m in 12th grade...', status: 'pending', expert: null, response: null, date: '2026-03-21' },
    { id: 'Q002', name: 'Priya Patel', email: 'priya@example.com', category: 'career', question: 'Skills for software engineering?', desc: 'What languages...', status: 'assigned', expert: 'Dr. Amit Sharma', response: null, date: '2026-03-20' },
    { id: 'Q003', name: 'Vikram Singh', email: 'vikram@example.com', category: 'admission', question: 'IIT Bombay chances?', desc: 'My JEE score...', status: 'resolved', expert: 'Prof. Deepak Verma', response: 'You have a good chance...', date: '2026-03-19' }
];
const experts = ['Dr. Amit Sharma', 'Prof. Deepak Verma', 'Ms. Neha Gupta', 'Dr. Rajiv Kumar'];

// Initialize Chart.js Performance Chart
function initPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    const performanceData = {
        labels: ['20-21\nOdd', '20-21\nEven', '21-22\nOdd', '21-22\nEven', '22-23\nOdd', '22-23\nEven', '23-24\nOdd', '23-24\nEven', '24-25\nOdd', '24-25\nEven'],
        students: [125, 175, 310, 354, 394, 438, 491, 457, 743, 993],
        scholarships: [524860, 746135, 1367876, 1486358, 1721253, 1900410, 2104980, 2036404, 3451244, 4764669]
    };

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: performanceData.labels,
            datasets: [
                {
                    label: 'Students Supported',
                    data: performanceData.students,
                    backgroundColor: 'rgba(214, 61, 0, 0.81)',
                    borderColor: 'rgba(42, 42, 42, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                    borderRadius: 4,
                },
                {
                    label: 'Scholarships (₹ Lakhs)',
                    data: performanceData.scholarships.map(val => Math.round(val / 100000)),
                    backgroundColor: 'rgba(0, 100, 194, 0.6)',
                    borderColor: 'rgba(85, 85, 85, 1)',
                    borderWidth: 1,
                    yAxisID: 'y1',
                    borderRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 600 },
                        color: '#2a2a2a',
                        padding: 15,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(42, 42, 42, 0.9)',
                    padding: 12,
                    titleFont: { size: 13, weight: 600 },
                    bodyFont: { size: 12 },
                    borderColor: '#999999',
                    borderWidth: 1,
                    cornerRadius: 4,
                    callbacks: {
                        afterLabel: function(context) {
                            if (context.datasetIndex === 1) {
                                return '₹ ' + context.parsed.y + ' Lakhs';
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Number of Students',
                        font: { size: 12, weight: 600 },
                        color: '#2a2a2a'
                    },
                    ticks: {
                        color: '#999999',
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)',
                        drawBorder: false
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Scholarships (₹ Lakhs)',
                        font: { size: 12, weight: 600 },
                        color: '#2a2a2a'
                    },
                    ticks: {
                        color: '#999999',
                        font: { size: 11 }
                    },
                    grid: {
                        drawOnChartArea: false,
                    }
                },
                x: {
                    ticks: {
                        color: '#999999',
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(200, 200, 200, 0.2)',
                        drawBorder: false
                    }
                }
            }
        }
    });
}

// Initialize chart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPerformanceChart();
});

function goHome() {
    currentUser = null;
    showPage('homePage');
    document.getElementById('logoutBtn').style.display = 'none';
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function showLogin(role) {
    showPage('loginPage');
    document.querySelectorAll('.login-type-btn').forEach(b => b.classList.remove('active'));
}

function selectLoginType(role) {
    document.querySelectorAll('.login-type-btn').forEach(b => b.classList.remove('active'));
    event.target.closest('.login-type-btn').classList.add('active');
    document.getElementById('loginForm').classList.add('active');
}

function handleLogin(e) {
    e.preventDefault();
    currentUser = { role: 'student' };
    showPage('appPage');
    document.getElementById('logoutBtn').style.display = 'block';
    updateStats();
    renderQueries();
    switchTab('dashboard');
}

function logout() {
    goHome();
}

function submitQuery(e) {
    e.preventDefault();
    const form = e.target;
    const newQuery = {
        id: 'Q' + String(queries.length + 1).padStart(3, '0'),
        name: form.children[0].children[1].value,
        email: form.children[1].children[1].value,
        category: form.children[2].children[1].value,
        question: form.children[3].children[1].value,
        desc: form.children[4].children[1].value,
        status: 'pending',
        expert: null,
        response: null,
        date: new Date().toISOString().split('T')[0]
    };
    queries.push(newQuery);
    showMsg('✓ Query submitted successfully!');
    form.reset();
    updateStats();
    renderQueries();
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
    event.target.classList.add('active');
    if (tabId === 'dashboard') updateStats();
    if (tabId === 'manage') renderManage();
}

function renderQueries() {
    let html = '';
    queries.forEach(q => {
        html += `<div class="query-card">
                    <div class="query-header">
                        <div>
                            <div class="query-id">${q.id}</div>
                            <div class="query-meta">${q.date}</div>
                        </div>
                        <span class="query-status status-${q.status}">${q.status.toUpperCase()}</span>
                    </div>
                    <span class="query-category">${q.category.toUpperCase()}</span>
                    <div class="query-text"><strong>${q.question}</strong></div>
                    <div class="query-text">${q.desc}</div>
                    ${q.expert ? `<div class="query-text"><strong>Expert:</strong> ${q.expert}</div>` : ''}
                    ${q.response ? `<div class="query-text"><strong>Response:</strong> ${q.response}</div>` : ''}
                </div>`;
    });
    document.getElementById('queryList').innerHTML = html || '<p style="color:#999;">No queries yet</p>';
}

function updateStats() {
    document.getElementById('stat-total').textContent = queries.length;
    document.getElementById('stat-pending').textContent = queries.filter(q => q.status === 'pending').length;
    document.getElementById('stat-assigned').textContent = queries.filter(q => q.status === 'assigned').length;
    document.getElementById('stat-resolved').textContent = queries.filter(q => q.status === 'resolved').length;
}

function filterQueries(status) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderManage();
}

function renderManage() {
    const status = document.querySelector('.filter-btn.active')?.textContent.toLowerCase().replace(' ', '') || 'all';
    let filtered = status === 'all' ? queries : queries.filter(q => q.status === status);
    let html = '';
    filtered.forEach(q => {
        html += `<div class="query-card">
                    <div class="query-header">
                        <div>
                            <div class="query-id">${q.id} - ${q.name}</div>
                            <div class="query-meta">${q.email}</div>
                        </div>
                        <span class="query-status status-${q.status}">${q.status.toUpperCase()}</span>
                    </div>
                    <span class="query-category">${q.category}</span>
                    <div class="query-text"><strong>${q.question}</strong></div>
                    <div class="form-group">
                        <label>Assign Expert</label>
                        <select class="select-box" onchange="assignExpert('${q.id}', this.value)">
                            <option value="">-- Select Expert --</option>
                            ${experts.map(e => `<option value="${e}" ${q.expert === e ? 'selected' : ''}>${e}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="select-box" onchange="updateStatus('${q.id}', this.value)">
                            <option value="pending" ${q.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="assigned" ${q.status === 'assigned' ? 'selected' : ''}>Assigned</option>
                            <option value="resolved" ${q.status === 'resolved' ? 'selected' : ''}>Resolved</option>
                        </select>
                    </div>
                </div>`;
    });
    document.getElementById('manageList').innerHTML = html;
}

function assignExpert(qid, expert) {
    const q = queries.find(x => x.id === qid);
    if (q) q.expert = expert;
    if (q && q.status === 'pending') q.status = 'assigned';
    showMsg('✓ Query assigned');
    updateStats();
    renderManage();
}

function updateStatus(qid, status) {
    const q = queries.find(x => x.id === qid);
    if (q) q.status = status;
    showMsg('✓ Status updated');
    updateStats();
    renderManage();
}

function showMsg(msg) {
    const el = document.getElementById('successMessage');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}