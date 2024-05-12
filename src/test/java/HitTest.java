import model.AreaResultChecker;
import org.junit.Assert;
import org.junit.jupiter.api.Test;

public class HitTest {
    @Test
    public void areaHitTest() {
        Assert.assertTrue(!AreaResultChecker.getResult(1, 1, 2));
    }

}
