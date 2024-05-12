<%--
  Created by IntelliJ IDEA.
  User: vedzevgn
  Date: 9.10.23
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% int statusCode = (Integer) request.getAttribute("jakarta.servlet.error.status_code");
   String errorMessage = (String) request.getAttribute("jakarta.servlet.error.message");%>

<html>
<head>
    <title>Ошибка <%= statusCode %></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>
<body>
    <div class="screenCentered">
        <p class="subtitle">Ошибка <%= statusCode %></p>
        <p><%= errorMessage %></p><br>

        <a href="<%= request.getContextPath()%>">
            <div class="button">
                <div class="icon" style="background-image: url(icons/arrow.png);"></div>
                <p>Вернуться на главную</p>
            </div>
        </a>
    </div>
<% %>
</body>
</html>
