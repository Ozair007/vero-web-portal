<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>API Data Display</title>
    <link rel="stylesheet" href="styles.css">
    <meta name="description" content="Responsive API data display application">
</head>
<body>
    <div class="container"> 
        <h1>Tasks Data</h1>
        
        <div class="controls">
            <input type="text" id="searchInput" placeholder="Search tasks...">
            <button id="openModalBtn">Open Image Modal</button>
        </div>
        <div id="loading">Loading data...</div>
        <div id="error" class="error"></div>
        <div id="dataTableContainer">
            <table id="dataTable">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Color Code</th>
                    </tr>
                </thead>
                <tbody id="tableBody"></tbody>
            </table>
        </div>
    </div>
    
    <!-- Image Modal -->
    <div id="imageModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Image Upload</h2>
            <input type="file" id="imageUpload" accept="image/*">
            <div id="imagePreviewContainer">
                <img id="imagePreview" style="display: none;">
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>