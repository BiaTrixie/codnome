import java.util.Random;

public class Gerador {

    public static void geraCodnome() {
        String[] alfabeto = {"cenoura", "abacate", "repolho", "tomate", "pepino", "ervilha"};
        StringBuilder codnome = new StringBuilder();

        for (int i = 0; i < 1; i++) {
            int caractereIndex = new Random().nextInt(alfabeto.length);
            codnome.append(alfabeto[caractereIndex]);
        }

        System.out.println(codnome);
    }

    public static void main(String[] args) {
        geraCodnome();
    }
}
