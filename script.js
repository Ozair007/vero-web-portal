document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const dataTable = document.getElementById('dataTable');
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    
    let tasksData = [];
    
    // Initial data load
    fetchData();
    
    // Set up auto-refresh every 60 minutes
    setInterval(fetchData, 60 * 60 * 1000);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        filterTable(this.value.toLowerCase());
    });
    
    // Modal functionality
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    imageUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
    
    function fetchData() {
        loadingDiv.style.display = 'block';
        errorDiv.textContent = '';
        dataTable.style.display = 'none';
        
        fetch('api_handler.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                
                tasksData = Array.isArray(data) ? data : [];
                renderTable(tasksData);
                loadingDiv.style.display = 'none';
                dataTable.style.display = 'table';
            })
            .catch(error => {
                console.error('Error:', error);
                loadingDiv.style.display = 'none';
                errorDiv.textContent = 'Failed to load data: ' + error.message;
            });
    }

    function renderTable(data) {
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4">No data available</td>';
            tableBody.appendChild(row);
            return;
        }
    
        data.forEach(item => {
            const row = document.createElement('tr');
            
            ['task', 'title', 'description', 'colorCode'].forEach(key => {
                const cell = document.createElement('td');
                cell.setAttribute('data-label', key.charAt(0).toUpperCase() + key.slice(1));
                
                if (key === 'colorCode') {
                    const colorBox = document.createElement('div');
                    colorBox.className = 'color-box';
                    colorBox.style.backgroundColor = item[key] || 'transparent';
                    cell.appendChild(colorBox);
                    cell.appendChild(document.createTextNode(' ' + (item[key] || '-')));
                } else {
                    cell.textContent = item[key] || '-';
                }
                
                row.appendChild(cell);
            });
            
            tableBody.appendChild(row);
        });
    }
    
    function filterTable(searchTerm) {
        if (!searchTerm) {
            renderTable(tasksData);
            return;
        }
        
        const filteredData = tasksData.filter(item => {
            return (
                (item.task && item.task.toLowerCase().includes(searchTerm)) ||
                (item.title && item.title.toLowerCase().includes(searchTerm)) ||
                (item.description && item.description.toLowerCase().includes(searchTerm)) ||
                (item.colorCode && item.colorCode.toLowerCase().includes(searchTerm))
            );
        });
        
        renderTable(filteredData);
    }
});