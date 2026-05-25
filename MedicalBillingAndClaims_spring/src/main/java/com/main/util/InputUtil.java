package com.main.util;

public class InputUtil {

public static String updateIfNotBlank(String oldV,String newV){
if(newV.isBlank()) return oldV;
return newV;
}
}
