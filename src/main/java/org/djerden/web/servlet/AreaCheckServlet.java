package org.djerden.web.servlet;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Objects;


@WebServlet(name = "checkServlet", value = "/area-check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        final long startExec = System.nanoTime();

        ServletContext servletContext = getServletContext();
        RequestDispatcher rd;

        final String ctx = this.getServletContext().getContextPath();

        final String x = req.getParameter("x");
        final String y = req.getParameter("y");
        final String r = req.getParameter("r");
        final String clear = req.getParameter("clear");

        final double dx;
        final double dy;
        final double dr;

        try {
            dx = Double.parseDouble(x);
            dy = Double.parseDouble(y);
            dr = Double.parseDouble(r);
        } catch (NumberFormatException | NullPointerException e) {
            resp.sendError(400);
            return;
        }

        if(!validateXYR(dx, dy, dr)) {
            resp.sendError(400, "Некорректный запрос");
            return;
        }

        final boolean result = checkArea(dx, dy, dr);

        LinkedList<Map<String, Object>> list = (LinkedList<Map<String, Object>>) servletContext.getAttribute("pointsList");
        if (list == null || Objects.equals(clear, "true")) {
            list = new LinkedList<Map<String, Object>>();
            servletContext.setAttribute("pointsList", list);
        }

        final long endExec = System.nanoTime();
        final long executionTime = (endExec - startExec);
        final LocalDateTime executedAt = LocalDateTime.now();

        Map<String, Object> point = new HashMap<String, Object>();
        point.put("x", dx);
        point.put("y", dy);
        point.put("r", dr);
        point.put("result", result);
        point.put("calculationTime", executionTime);
        point.put("time", executedAt);

        list.addFirst(point);

        servletContext.setAttribute("pointsList", list);


        resp.setContentType("text/html;charset=UTF-8");
        final PrintWriter out = resp.getWriter();

        final String validBox = "<div class=\"resultBox validResult\"><div class=\"resultBoxShine\"></div><div class=\"icon\" style=\"background-image: url(icons/done.png);\"></div><p>Точка попадает в область<p></div>";
        final String invalidBox = "<div class=\"resultBox invalidResult\"><div class=\"icon\" style=\"background-image: url(icons/closeR.png);\"></div><p>Точка не попадает в область<p></div>";

        out.println("<!DOCTYPE html>");
        out.println("<html>");
        out.println("<head>");
        out.println("  <meta charset=\"UTF-8\">");
        out.println("  <title>Результат проверки</title>");
        out.println("  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js\"></script>");
        out.println("  <script src=\"https://unpkg.com/cookielib/src/cookie.min.js\"></script>");
        out.println("  <link type=\"image/x-icon\" href=\"icons/logo.ico\" rel=\"shortcut icon\">");
        out.println("  <link type=\"Image/x-icon\" href=\"icons/logo.ico\" rel=\"icon\">");
        out.println("  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
        out.println("  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">");
        out.println("  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>");
        out.println("  <link href=\"https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap\" rel=\"stylesheet\">");
        out.println("  <link href=\"style.css\" rel=\"stylesheet\">");
        out.println("</head>");
        out.println("<body>");
        out.println("<script>");
        out.println("  document.addEventListener(\"DOMContentLoaded\", (event) => {");
        out.println("    appear();");
        out.println("  });");
        out.println("</script>");
        out.println("<div id=\"modalWindowBack\" class=\"hiddenModalBack\">");
        out.println("  <div class=\"modalWindow closedModalWindow\" id=\"internalErrorWindow\">");
        out.println("    <div class=\"closeButton\" onClick=\"closeModalWindow('internalErrorWindow')\"></div>");
        out.println("    <div style=\"display: flex; flex-direction: row; align-items: center;\">");
        out.println("      <p class=\"subtitle\">Внутренняя ошибка</p>");
        out.println("    </div>");
        out.println("    <p class=\"errorMessage\">Произошла ошибка, пожалуйста, повторите попытку.</p>");
        out.println("  </div>");
        out.println("</div>");
        out.println("<div id=\"header\" class=\"header\">");
        out.println("  <a href=" + ctx + "><div id=\"logo\"></div></a>");
        out.println("  <div class=\"headerInfo\">");
        out.println("    <a href=\"https://my.itmo.ru/persons/372796\">");
        out.println("      <p>Башаримов Евгений Александрович</p>");
        out.println("    </a>");
        out.println("    <p>P3206</p>");
        out.println("    <p>Вариант #1715</p>");
        out.println("  </div>");
        out.println("</div>");
        out.println("<div class=\"contentWrapper\" style=\"opacity: 0; transform: scale(0.9);\">");
        out.println("  <div id=\"tableBox\">");
        out.println("    <h1>Результат проверки</h1>");
        if(result){
            out.println(validBox);
        } else {
            out.println(invalidBox);
        }
        out.println("    <p style=\"margin-bottom: 10px; margin-top: 20px;\">Переданные данные</p>");
        out.println("    <div class=\"tableWrapper\">");
        out.println("      <table class=\"border-none fixedHead\" id=\"dataTable\">");
        out.println("<thead>");
        out.println("        <tr>");
        out.println("          <th>X</th>");
        out.println("          <th>Y</th>");
        out.println("          <th>R</th>");
        out.println("        </tr>");
        out.println("        </thead>");
        out.println("        <tr>");
        out.println("          <th>" + dx + "</th>");
        out.println("          <th>" + dy + "</th>");
        out.println("          <th>" + dr + "</th>");
        out.println("        </tr>");
        out.println("        </tbody>");
        out.println("      </table>");
        out.println("    </div>");
        out.println("  </div>");
        out.println("  <!--<div class=\"imageWrapper\" style=\"background-image: url(images/areas.png);\"></div>-->");  // Commented out
        out.println("  <div id=\"timeBox\">");
        out.println("    <div class=\"icon\" style=\"background-image: url(icons/clock.png);\"></div>");
        out.println("    <p id=\"currentTime\"></p>");
        out.println("  </div>");
        out.println("</div>");
        out.println("<script src=\"js/script.js\"></script>");
        out.println("</body>");
        out.println("</html>");

        out.close();
    }

    private boolean checkInCircle(final double x, final double y, final double r){
        return x < 0 && y > 0 && Math.sqrt(x * x + y * y) <= r;
    }

    private boolean checkArea(final double x, final double y, final double r) {
        boolean inCircle = checkInCircle(x, y, r);
        boolean inTriangle = (x <= 0 && y <= 0 && Math.abs(x) + Math.abs(y) <= r/2);
        boolean inArea = (x >= 0 && x <= r && y <= 0 && y >= -r/2);
        return inCircle || inTriangle || inArea;
    }

    private boolean validateXYR(double x, double y, double r) {
        if (x >= -3 && x <= 5 && y >= -3 && y <= 3 && r >= 2 && r <= 5) {
            return true;
        } else {
            return false;
        }
    }
}
