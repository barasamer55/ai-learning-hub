import { supabase, login, logoutUser } from './supabase.js';

// --- INITIAL DATA ---
const INITIAL_DATA = {
    stats: {
        totalMastery: 0,
        dailyStreak: 0,
        timeInvested: 0,
        easySolved: 0,
        mediumSolved: 0,
        hardSolved: 0,
    },
    dsa: [
        { id: '1', title: 'Arrays & Hashing', solved: 0, total: 9, problems: [{ name: 'Contains Duplicate', diff: 'Easy', done: false }, { name: 'Valid Anagram', diff: 'Easy', done: false }] },
        { id: '2', title: 'Two Pointers', solved: 0, total: 5, problems: [{ name: 'Valid Palindrome', diff: 'Easy', done: false }, { name: 'Two Sum II', diff: 'Medium', done: false }] },
        { id: '3', title: 'Stack', solved: 0, total: 7, problems: [{ name: 'Valid Parentheses', diff: 'Easy', done: false }, { name: 'Min Stack', diff: 'Medium', done: false }] },
        { id: '4', title: 'Binary Search', solved: 0, total: 7, problems: [{ name: 'Binary Search', diff: 'Easy', done: false }, { name: 'Search a 2D Matrix', diff: 'Medium', done: false }] },
        { id: '5', title: 'Sliding Window', solved: 0, total: 6, problems: [{ name: 'Best Time to Buy and Sell Stock', diff: 'Easy', done: false }, { name: 'Longest Substring Without Repeating Characters', diff: 'Medium', done: false }] },
        { id: '6', title: 'Linked List', solved: 0, total: 11, problems: [{ name: 'Reverse Linked List', diff: 'Easy', done: false }, { name: 'Merge Two Sorted Lists', diff: 'Easy', done: false }] },
        { id: '7', title: 'Trees', solved: 0, total: 15, problems: [{ name: 'Invert Binary Tree', diff: 'Easy', done: false }, { name: 'Maximum Depth of Binary Tree', diff: 'Easy', done: false }] },
        { id: '8', title: 'Tries', solved: 0, total: 3, problems: [{ name: 'Implement Trie', diff: 'Medium', done: false }, { name: 'Design Add and Search Words', diff: 'Medium', done: false }] },
        { id: '9', title: 'Heap / Priority Queue', solved: 0, total: 7, problems: [{ name: 'Kth Largest Element', diff: 'Easy', done: false }, { name: 'Last Stone Weight', diff: 'Easy', done: false }] },
        { id: '10', title: 'Backtracking', solved: 0, total: 9, problems: [{ name: 'Subsets', diff: 'Medium', done: false }, { name: 'Combination Sum', diff: 'Medium', done: false }] },
        { id: '11', title: 'Graphs', solved: 0, total: 13, problems: [{ name: 'Number of Islands', diff: 'Medium', done: false }, { name: 'Max Area of Island', diff: 'Medium', done: false }] },
        { id: '12', title: '1-D DP', solved: 0, total: 12, problems: [{ name: 'Climbing Stairs', diff: 'Easy', done: false }, { name: 'Min Cost Climbing Stairs', diff: 'Easy', done: false }] },
        { id: '13', title: '2-D DP', solved: 0, total: 11, problems: [{ name: 'Unique Paths', diff: 'Medium', done: false }, { name: 'Longest Common Subsequence', diff: 'Medium', done: false }] },
        { id: '14', title: 'Greedy', solved: 0, total: 8, problems: [{ name: 'Maximum Subarray', diff: 'Medium', done: false }, { name: 'Jump Game', diff: 'Medium', done: false }] },
        { id: '15', title: 'Advanced Graphs', solved: 0, total: 6, problems: [{ name: 'Reconstruct Itinerary', diff: 'Hard', done: false }, { name: 'Min Cost to Connect Points', diff: 'Medium', done: false }] },
        { id: '16', title: 'Intervals', solved: 0, total: 6, problems: [{ name: 'Insert Interval', diff: 'Medium', done: false }, { name: 'Merge Intervals', diff: 'Medium', done: false }] },
        { id: '17', title: 'Bit Manipulation', solved: 0, total: 7, problems: [{ name: 'Single Number', diff: 'Easy', done: false }, { name: 'Number of 1 Bits', diff: 'Easy', done: false }] },
        { id: '18', title: 'Math & Geometry', solved: 0, total: 8, problems: [{ name: 'Rotate Image', diff: 'Medium', done: false }, { name: 'Spiral Matrix', diff: 'Medium', done: false }] },
    ],
    courses: [
        {
            track: 'AI Engineering Professional Certificate',
            modules: [
                { name: 'Machine Learning with Python', done: false },
                { name: 'Introduction to Deep Learning & Neural Networks with Keras', done: false },
                { name: 'Deep Learning with Keras and Tensorflow', done: false },
                { name: 'Introduction to Neural Networks and PyTorch', done: false },
                { name: 'Deep Learning with PyTorch', done: false },
                { name: 'AI Capstone Project with Deep Learning', done: false },
                { name: 'Generative AI and LLMs: Architecture and Data Preparation', done: false },
                { name: 'Gen AI Foundational Models for NLP & Language Understanding', done: false },
                { name: 'Generative AI Language Modeling with Transformers', done: false },
                { name: 'Generative AI Engineering and Fine-Tuning Transformers', done: false },
                { name: 'Generative AI Advance Fine-Tuning for LLMs', done: false },
                { name: 'Fundamentals of AI Agents Using RAG and LangChain', done: false },
                { name: 'Project: Generative AI Applications with RAG and LangChain', done: false },
            ]
        },
        {
            track: 'IBM Data Science Professional Certificate',
            modules: [
                { name: 'Tools for Data Science', done: false },
                { name: 'Data Science Methodology', done: false },
                { name: 'Python for Data Science, AI & Development', done: false },
                { name: 'Python Project for Data Science', done: false },
                { name: 'Databases and SQL for Data Science with Python', done: false },
                { name: 'Data Analysis with Python', done: false },
                { name: 'Data Visualization with Python', done: false },
                { name: 'Applied Data Science Capstone', done: false },
                { name: 'Generative AI: Elevate Your Data Science Career', done: false },
                { name: 'Data Scientist Career Guide and Interview Preparation', done: false },
            ]
        }
    ],
    projects: [
        { id: '1', title: 'Strawberry Detection', desc: 'Detect strawberries in images', status: 'Planned', tags: ['CV', 'Object Detection'] },
        { id: '2', title: 'CV Dataset Builder', desc: 'Tool to build CV datasets', status: 'Planned', tags: ['Python', 'React'] },
        { id: '3', title: 'DSA Dashboard System', desc: 'Dashboard for tracking DSA progress', status: 'In Progress', tags: ['React', 'Firebase'] },
    ]
};

// --- APP STATE ---
let state = {
    user: null,
    data: null,
    notes: [],
    activeView: 'dashboard'
};

// --- DOM ELEMENTS ---
const authOverlay = document.getElementById('auth-overlay');
const appLayout = document.getElementById('app-layout');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const pageContent = document.getElementById('page-content');
const breadcrumbView = document.getElementById('breadcrumb-view');
const headerTitle = document.getElementById('header-title');
const navLinks = document.querySelectorAll('.nav-link');
const userAvatar = document.getElementById('user-avatar');

// --- ROUTING ---
const routes = {
    dashboard: '/pages/dashboard.html',
    dsa: '/pages/dsa.html',
    courses: '/pages/courses.html',
    knowledge: '/pages/knowledge.html',
    projects: '/pages/projects.html'
};

async function navigate(view) {
    state.activeView = view;
    window.location.hash = view;
    
    // Update UI
    navLinks.forEach(link => {
        if (link.dataset.view === view) {
            link.classList.add('bg-primary/10', 'text-primary', 'border-primary/20');
            link.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/5');
        } else {
            link.classList.remove('bg-primary/10', 'text-primary', 'border-primary/20');
            link.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-white/5');
        }
    });

    breadcrumbView.textContent = view;
    headerTitle.textContent = view.charAt(0).toUpperCase() + view.slice(1);

    try {
        const response = await fetch(routes[view]);
        const html = await response.text();
        pageContent.innerHTML = html;
        renderViewData();
    } catch (err) {
        console.error('Failed to load page:', err);
    }
}

// --- DATA RENDERING ---
function renderViewData() {
    if (!state.data) return;

    if (state.activeView === 'dashboard') {
        renderDashboard();
    } else if (state.activeView === 'dsa') {
        renderDSA();
    } else if (state.activeView === 'courses') {
        renderCourses();
    } else if (state.activeView === 'knowledge') {
        renderKnowledge();
    } else if (state.activeView === 'projects') {
        renderProjects();
    }
}

function renderDashboard() {
    const stats = state.data.stats;
    document.getElementById('total-mastery').textContent = `${stats.totalMastery}%`;
    document.getElementById('daily-streak').textContent = stats.dailyStreak;
    document.getElementById('time-invested').textContent = `${stats.timeInvested}h`;
    
    // Update radial progress
    const radial = document.querySelector('.radial-progress-bg');
    if (radial) radial.style.background = `conic-gradient(#1337ec ${stats.totalMastery}%, #282b39 0)`;
}

function renderDSA() {
    const stats = state.data.stats;
    document.getElementById('total-solved').textContent = state.data.dsa.reduce((acc, t) => acc + t.solved, 0);
    document.getElementById('easy-solved').textContent = stats.easySolved;
    document.getElementById('medium-solved').textContent = stats.mediumSolved;
    document.getElementById('hard-solved').textContent = stats.hardSolved;

    const topicGrid = document.getElementById('topic-grid');
    if (topicGrid) {
        topicGrid.innerHTML = state.data.dsa.map(topic => `
            <div class="bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col gap-4">
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-white">${topic.title}</h4>
                    <span class="text-xs font-mono text-slate-500">${topic.solved}/${topic.total}</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-primary h-full" style="width: ${(topic.solved / topic.total) * 100}%"></div>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="text-[10px] uppercase text-slate-500 font-bold">Next Up</p>
                    ${topic.problems.slice(0, 2).map(p => `
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-slate-300">${p.name}</span>
                            <span class="text-[10px] px-1.5 py-0.5 rounded border border-slate-700 text-slate-500">${p.diff}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

function renderCourses() {
    const container = document.getElementById('courses-container');
    if (container) {
        container.innerHTML = state.data.courses.map((track, idx) => `
            <div class="flex flex-col gap-4">
                <h3 class="text-white text-lg font-bold flex items-center gap-2">
                    <span class="w-1 h-6 bg-primary rounded-full"></span>
                    ${track.track}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${track.modules.map((m, mIdx) => `
                        <div class="bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col justify-between group hover:border-primary/50 transition-all">
                            <div class="flex justify-between items-start mb-4">
                                <span class="text-xs font-medium px-2 py-1 bg-slate-800 rounded text-slate-400">${m.done ? 'Completed' : 'Not Started'}</span>
                                <button onclick="toggleModule(${idx}, ${mIdx})" class="text-primary hover:text-white">
                                    <span class="material-symbols-outlined">${m.done ? 'check_circle' : 'radio_button_unchecked'}</span>
                                </button>
                            </div>
                            <h4 class="text-white font-bold text-sm mb-2">${m.name}</h4>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

function renderKnowledge() {
    const list = document.getElementById('notes-list');
    if (list) {
        list.innerHTML = state.notes.map(note => `
            <div class="p-4 bg-surface-dark border border-border-dark rounded-lg flex flex-col gap-2">
                <h4 class="font-bold text-white">${note.title}</h4>
                <p class="text-sm text-slate-400 line-clamp-2">${note.content}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-500 uppercase">${note.category}</span>
                    <span class="text-[10px] text-slate-600">${note.date}</span>
                </div>
            </div>
        `).join('');
    }
}

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (grid) {
        grid.innerHTML = state.data.projects.map(p => `
            <div class="bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col gap-4 group hover:border-primary/50 transition-all">
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-white">${p.title}</h4>
                    <span class="text-[10px] px-2 py-0.5 rounded border ${p.status === 'Completed' ? 'border-emerald-500/50 text-emerald-500' : p.status === 'In Progress' ? 'border-amber-500/50 text-amber-500' : 'border-slate-700 text-slate-500'}">${p.status}</span>
                </div>
                <p class="text-sm text-slate-400 line-clamp-2">${p.desc}</p>
                <div class="flex flex-wrap gap-2 mt-auto">
                    ${p.tags.map(t => `<span class="text-[10px] px-2 py-0.5 bg-slate-800 rounded text-slate-500 font-mono">${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
}

// --- ACTIONS ---
window.toggleModule = async (trackIdx, moduleIdx) => {
    state.data.courses[trackIdx].modules[moduleIdx].done = !state.data.courses[trackIdx].modules[moduleIdx].done;
    await syncData();
};

window.addNote = async (e) => {
    e.preventDefault();
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const category = document.getElementById('note-category').value;
    
    if (!title || !content) return;

    const { error } = await supabase
        .from('notes')
        .insert([{
            user_id: state.user.id,
            title,
            content,
            category,
            date: new Date().toLocaleDateString()
        }]);

    if (error) console.error('Error adding note:', error.message);
    document.getElementById('note-form').reset();
};

async function syncData() {
    if (!state.user) return;
    const { error } = await supabase
        .from('users')
        .upsert({ id: state.user.id, data: state.data });
    if (error) console.error('Error syncing data:', error.message);
}

// --- AUTH LISENER ---
supabase.auth.onAuthStateChange(async (event, session) => {
    const user = session?.user;
    if (user) {
        state.user = user;
        userAvatar.src = user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=Bara+Samer&background=1337ec&color=fff`;
        
        authOverlay.classList.add('hidden');
        appLayout.classList.remove('hidden');

        // Fetch user data
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('data')
            .eq('id', user.id)
            .single();
        
        if (userError || !userData) {
            state.data = INITIAL_DATA;
            await syncData();
        } else {
            state.data = userData.data;
        }

        // Real-time sync for user data
        supabase
            .channel('public:users')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'users', filter: `id=eq.${user.id}` }, payload => {
                state.data = payload.new.data;
                renderViewData();
            })
            .subscribe();

        // Notes sync
        const fetchNotes = async () => {
            const { data: notesData, error: notesError } = await supabase
                .from('notes')
                .select('*')
                .eq('user_id', user.id)
                .order('date', { ascending: false });
            
            if (!notesError) {
                state.notes = notesData;
                if (state.activeView === 'knowledge') renderKnowledge();
            }
        };

        fetchNotes();

        // Real-time sync for notes
        supabase
            .channel('public:notes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'notes', filter: `user_id=eq.${user.id}` }, () => {
                fetchNotes();
            })
            .subscribe();

        // Initial navigation
        const view = window.location.hash.replace('#', '') || 'dashboard';
        navigate(view);
    } else {
        state.user = null;
        state.data = null;
        authOverlay.classList.remove('hidden');
        appLayout.classList.add('hidden');
    }
});

loginBtn.onclick = login;
logoutBtn.onclick = logoutUser;

window.onhashchange = () => {
    const view = window.location.hash.replace('#', '') || 'dashboard';
    if (view !== state.activeView) navigate(view);
};
